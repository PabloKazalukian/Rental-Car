import { Component, Input, OnInit } from '@angular/core';
import { RequestReceived } from 'src/app/core/models/request.interface';
import { Subscription } from 'rxjs';
import { RentalService } from 'src/app/core/services/rental.service';
import { Usuario } from 'src/app/core/models/user.interface';
import { UserComponent } from '../user.component';
import { formatDateToLocale } from 'src/app/shared/validators/date.validator';

@Component({
    selector: 'app-table-rental',
    templateUrl: './table-rental.component.html',
    styleUrls: ['./table-rental.component.css']
})

export class TableRentalComponent implements OnInit {

    private subscripcions: Subscription[] = [];

    @Input() user!: Usuario
    show!: boolean
    request!: RequestReceived[]
    dataSource!: RequestTableRow[];
    dataSourceComplete!: RequestTableRow[];
    displayedColumns: string[] = ['initial_date', 'final_date', 'brand', 'model', 'amount', 'modify'];
    columns = [
        { key: 'initialDate', label: 'Fecha Inicial' },
        { key: 'finalDate', label: 'Fecha Final' },
        {
            key: 'brand',
            label: 'Marca',
            link: (value: string) => `/solicitar-auto?brand=${value.replace(/ /g, '-')}`
        },
        {
            key: 'model',
            label: 'Modelo',
            link: (value: string) => `/solicitar-auto?model=${value.replace(/ /g, '-')}`
        },
        { key: 'amount', label: 'Monto' }
    ];

    constructor(private requestSvc: RentalService, private data: UserComponent) { }


    ngOnInit(): void {
        this.show = true;
        setTimeout(() =>
            this.subscripcions.push(
                this.data.readData().subscribe(e => {
                    if (e !== undefined) {
                        const requestTable: RequestTableRow[] = e.map((r): RequestTableRow => ({
                            id: r.id,
                            initialDate: formatDateToLocale(r.initialDate),
                            finalDate: formatDateToLocale(r.finalDate),
                            brand: r.car_id.brand,
                            model: r.car_id.model,
                            amount: r.amount,
                            state: r.state
                        }));
                        this.dataSource = requestTable;
                        this.dataSourceComplete = requestTable;
                        this.request = e;
                        this.show = false;
                    }
                })
            )
            , 2000);
    };



    // applyFilter(event: Event) {
    //     const filterValue = (event.target as HTMLInputElement).value;
    //     // console.log(filterValue)
    //     if (filterValue) {
    //         this.dataSource = this.dataSourceComplete.filter(({ car_id }) => car_id.model.toLowerCase().includes(filterValue) || car_id.brand.toLowerCase().includes(filterValue.toLowerCase()));
    //     } else {
    //         this.dataSource = this.dataSourceComplete
    //     }
    //     // this.dataSource.filter = filterValue.trim().toLowerCase();
    // }

    cancelRequest(element: any): void {
        // element.state = 'cancel';
        console.log(element)
        this.subscripcions.push(
            this.requestSvc.cancelRequestByIdRequest(element.id).subscribe({
                next: (res) => {
                    element.state = 'cancelNow';
                },
                error: (res) => {
                    console.log(res)
                    // this.login=false
                },
            })
        )
    };

    confirmRequest(element: any): void {
        // confirmRequestByIdRequest
        // element.state = 'can'
        console.log(element.id)
        this.subscripcions.push(
            this.requestSvc.confirmRequestByIdRequest(element.id).subscribe({
                next: (res) => {
                    element.state = 'con';
                },
                error: (res) => {
                    // this.login=false
                },
            })
        )
    };

    ngOnDestroy(): void {
        this.subscripcions.forEach((e) => e.unsubscribe())
    };
}

export interface RequestTableRow {
    id: string;
    initialDate: string;
    finalDate: string;
    brand: string;
    model: string;
    amount: number;
    state: string; // Para los botones condicionales
}
