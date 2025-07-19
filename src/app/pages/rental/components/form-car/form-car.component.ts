import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder } from '@angular/forms';
import { Subscription, } from 'rxjs';
import { Car } from 'src/app/core/models/car.interface';
import { Request, RequestSend } from 'src/app/core/models/request.interface';
import { RentalService } from 'src/app/core/services/rental.service';
import { DatePipe } from '@angular/common';

type FormDatesGroup = FormGroup<{
    start: FormControl<Date | null>;
    end: FormControl<Date | null>;
    total: FormControl<Request[] | null>;
    amount: FormControl<number>;
    days: FormControl<number>;
}>;

@Component({
    selector: 'app-form-car',
    templateUrl: './form-car.component.html',
    styleUrls: ['./form-car.component.css']
})




export class FormCarComponent implements OnInit, OnDestroy {

    @ViewChild('btnDialog') btnDialog!: TemplateRef<any>;
    @ViewChild('contentDialog') contentDialog!: TemplateRef<any>;

    @Input() idCar!: string;
    @Input() cars?: Car | undefined;
    @Input() user?: { username: string, sub: string, role: string } | undefined;
    @Output() stepChanged = new EventEmitter<number>();


    arrRequest!: Request[]
    // range!: UntypedFormGroup;
    showDialog: boolean = false;
    dialogData!: RequestSend & { onConfirm: () => void }
    range!: FormDatesGroup;
    private subscriptions: Subscription[] = [];

    userId!: string;
    username?: string;
    success!: boolean
    loading: boolean = true

    constructor(
        private readonly fb: UntypedFormBuilder,
        private rentalSvc: RentalService,
    ) { }


    ngOnInit(): void {

        this.range = this.initFormDates();
        this.subscriptions.push(
            this.rentalSvc.getRequestById(this.idCar).subscribe((res) => {
                setTimeout(() => this.loading = false, 1000)
                this.arrRequest = res;
                this.range.patchValue({ total: res });
            })
        );
    }

    onSubmit(): void {
        let start = new DatePipe('en').transform(this.range.value.start, 'yyyy-MM-dd');
        let end = new DatePipe('en').transform(this.range.value.end, 'yyyy-MM-dd');

        if (start && end) {
            let result: RequestSend = {
                amount: this.range.value?.amount,
                initialDate: this.range.value.start ?? undefined,
                finalDate: this.range.value.end ?? undefined,
                user_id: this.userId,
                car_id: this.idCar,
                state: 'req'
            }
            if (this.range.valid) {
                // Marca paso 2 como completo
                this.stepChanged.emit(2); // Paso 3 (confirmación)
            }
            this.dialogData = {
                ...result,
                onConfirm: () => {
                    this.stepChanged.emit(3);
                }
            };

            this.showDialog = true;

            // dialogRef.afterClosed().subscribe((result) => {
            //     console.log('El diálogo se cerró con el resultado:', result);

            //     if (result === true) {
            //         // Confirmado
            //     } else if (result === 'cancelled') {
            //         // Cancelación con botón
            //         this.stepChanged.emit(1);
            //     } else {
            //         this.stepChanged.emit(1);
            //         // Cierre fuera del diálogo
            //     }
            // });
        }
    };

    initFormDates(): FormDatesGroup {
        return this.fb.group({
            start: new FormControl<Date | null>(null),
            end: new FormControl<Date | null>(null),
            total: new FormControl<Request[] | null>(null),
            amount: new FormControl<number>(0),
            days: new FormControl<number>(0),
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((e) => e.unsubscribe())
    };

}
