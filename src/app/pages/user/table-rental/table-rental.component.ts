import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { delay, Observable, of, Subscription, switchMap } from 'rxjs';
import { RentalService } from 'src/app/core/services/rental.service';
import { formatDateToLocale } from 'src/app/shared/validators/date.validator';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { RequestTableRow } from 'src/app/core/models/request.interface';
import { on } from '@ngrx/store';
import { CheckoutService } from 'src/app/core/services/payment/checkout.service';

@Component({
    selector: 'app-table-rental',
    templateUrl: './table-rental.component.html',
    styleUrls: ['./table-rental.component.scss'],
})
export class TableRentalComponent implements OnInit {
    private subscripcions: Subscription[] = [];

    user$ = this.authSvc._user$;
    show!: boolean;
    isEmpty: boolean = false;
    displayedColumns: string[] = ['initial_date', 'final_date', 'brand', 'model', 'amount', 'modify'];
    columns = [
        { key: 'initialDate', label: 'Fecha Inicial' },
        { key: 'finalDate', label: 'Fecha Final' },
        {
            key: 'brand',
            label: 'Marca',
            link: (value: string) => `/solicitar-auto?brand=${value.replace(/ /g, '-')}`,
        },
        {
            key: 'model',
            label: 'Modelo',
            link: (value: string) => `/solicitar-auto?model=${value.replace(/ /g, '-')}`,
        },
        { key: 'amount', label: 'Monto' },
    ];
    pageSizeOptions: number[] = [5, 10, 15, 20];
    request$!: Observable<RequestTableRow[]>;

    constructor(
        private requestSvc: RentalService,
        private authSvc: AuthService,
        private checkouSvc: CheckoutService,
        private cdRef: ChangeDetectorRef,
    ) {}

    rawData: RequestTableRow[] = []; // viene del backend
    filteredData: RequestTableRow[] = []; // resultado del filtro
    pagedData: RequestTableRow[] = []; // lo que va a la tabla

    currentPage: number = 0;
    pageSize: number = 5;
    filterValue: string = '';

    ngOnInit(): void {
        this.show = true;
        this.subscripcions.push(
            this.user$
                .pipe(
                    delay(1000),
                    switchMap((user) => (user.sub ? this.requestSvc.getRequestByUserId(user.sub) : of([]))),
                )
                .pipe()
                .subscribe({
                    next: (res) => {
                        const checkoutRequests = this.checkouSvc.getRequest();

                        const requestTable: RequestTableRow[] = res.map((r): RequestTableRow => {
                            if (checkoutRequests.includes(r.id)) r.state = 'add';

                            return {
                                id: r.id,
                                initialDate: formatDateToLocale(r.initialDate),
                                finalDate: formatDateToLocale(r.finalDate),
                                brand: r.car_id.brand,
                                model: r.car_id.model,
                                amount: r.amount,
                                state: r.state,
                            };
                        });

                        this.rawData = requestTable;
                        this.filteredData = [...this.rawData];
                        this.updatePagination(this.filteredData);
                        this.show = false;
                        this.cdRef.detectChanges();
                    },
                    error: (err: any) => {
                        console.error('yo me equivokque', err);
                        this.show = false;
                        this.isEmpty = true;
                    },
                }),
        );
    }

    updatePagination(data: RequestTableRow[]) {
        this.pagedData = data.slice(0, this.pageSize);
    }

    onPageSizeChanged(newSize: number) {
        this.pageSize = newSize;
    }

    onFilteredData(filtered: RequestTableRow[]) {
        this.filteredData = filtered;
        this.updatePagination(filtered); // page 0
    }

    onPageData(pageSlice: RequestTableRow[]) {
        this.pagedData = pageSlice;
    }

    onOrderBy(by: { column: 'initialDate' | 'finalDate' | 'brand' | 'model' | 'amount'; isAscending: boolean }) {
        const result = this.filteredData.sort((a, b) => {
            const { column } = by;
            if (a[column] > b[column]) return by.isAscending ? 1 : -1;
            if (a[column] < b[column]) return by.isAscending ? -1 : 1;
            return 0;
        });

        this.onFilteredData(result);
    }

    onFilterStatus(state: string | null) {
        if (!this.rawData) return;

        if (state === '!can') {
            this.filteredData = this.rawData.filter((e) => e.state !== 'can');
        } else if (state !== '') {
            this.filteredData = this.rawData.filter((e) => e.state === state);
        } else if (state === '') {
            console.log(state);
            this.filteredData = this.rawData;
        }

        this.cdRef.detectChanges();
    }

    cancelRequest(element: any): void {
        this.subscripcions.push(
            this.requestSvc.cancelRequestByIdRequest(element.id).subscribe({
                next: (res) => {
                    element.state = 'cancelNow';
                },
                error: (res) => {
                    console.log(res);
                },
            }),
        );
    }

    confirmRequest(element: any): void {
        this.subscripcions.push(
            this.requestSvc.addCheckoutRequest(element.id).subscribe({
                next: (res) => {
                    element.state = 'add';
                },
                error: (err) => {
                    console.log(err);
                },
            }),
        );
    }

    ngOnDestroy(): void {
        this.subscripcions.forEach((e) => e.unsubscribe());
    }
}
