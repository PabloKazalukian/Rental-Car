import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder } from '@angular/forms';
import { delay, Subscription, } from 'rxjs';
import { Car } from 'src/app/core/models/car.interface';
import { Request, RequestSend } from 'src/app/core/models/request.interface';
import { RentalService } from 'src/app/core/services/rental.service';
import { DatePipe } from '@angular/common';
import { changeDateFormat, ownValidation } from 'src/app/shared/validators/date.validator';
import { Router } from '@angular/router';
import { OverlayService } from 'src/app/shared/services/ui/overlay.service';
import { DialogComponent } from 'src/app/shared/components/ui/dialog/dialog.component';
import { dateRangeValidator } from 'src/app/shared/validators/range.validator';

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

    private subscripcions: Subscription[] = [];


    arrRequest!: Request[]
    // range!: UntypedFormGroup;
    data!: RequestSend
    range!: FormDatesGroup;
    private subscriptions: Subscription[] = [];

    userId!: string;
    username?: string;
    success!: boolean
    loading: boolean = true;

    //dialog
    successDialog: boolean = false;
    loadingDialog: boolean = false;
    timeout: number = 1800; // tiempo de espera para cerrar el dialogo y redirigir al usuario

    constructor(
        private readonly fb: UntypedFormBuilder,
        private rentalSvc: RentalService,
        private overlayService: OverlayService,
        private router: Router,
    ) { }


    ngOnInit(): void {

        this.range = this.initFormDates();
        this.loading = false;

    }

    onSubmit(): void {
        // console.log('Submitting form with values:', this.range.value);
        let start = this.range.value.start
        let end = this.range.value.end


        if (start && end && this.user) {

            let result: RequestSend = {
                amount: this.range.value?.amount,
                initialDate: new Date(changeDateFormat(start)),
                finalDate: new Date(changeDateFormat(end)),
                user_id: this.user?.sub,
                car_id: this.idCar,
                state: 'req'
            }
            this.data = result

            this.overlayService.closeAll();
            const dialogRef = this.overlayService.open(DialogComponent, {
                actions: this.btnDialog,
                content: this.contentDialog,
                title: 'Confirme su alquiler!',
                data: result
            });

            dialogRef.afterClosed().subscribe((result) => {
                if (result === 'cancel') {
                    this.stepChanged.emit(1);

                }
            });
            console.log(this.range.valid)
            if (this.range.valid) {
                // Marca paso 2 como completo
                this.stepChanged.emit(2); // Paso 3 (confirmación)
            } else {

                this.stepChanged.emit(3);
            }
        }
    };

    initFormDates(): FormDatesGroup {
        return this.fb.group({
            start: new FormControl<Date | null>(null),
            end: new FormControl<Date | null>(null),
            total: new FormControl<Request[] | null>(null),
            amount: new FormControl<number>(0),
            days: new FormControl<number>(0),
        }, { validators: dateRangeValidator })
    };
    confirmRequest(state: 'con' | 'req'): void {
        this.loadingDialog = true;
        this.data.state = state;
        this.subscripcions.push(
            this.rentalSvc.sendRequest(this.data).pipe(
                delay(1000)
            ).subscribe({
                next: (res) => {
                    this.stepChanged.emit(3);

                    this.loadingDialog = false;
                    this.successDialog = true;
                    console.log(res);

                    setTimeout(() => {
                        // this.dialogRef.close();
                        this.router.navigate(['/usuario']);
                    }, this.timeout);
                },
                error: (res) => {
                    this.loadingDialog = false;
                    this.successDialog = false;
                    alert('error');
                }
            })
        )
    };

    ngOnDestroy(): void {
        this.subscriptions.forEach((e) => e.unsubscribe())
    };

}
