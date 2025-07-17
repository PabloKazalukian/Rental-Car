import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Car } from 'src/app/core/models/car.interface';
import { Request, RequestSend } from 'src/app/core/models/request.interface';
import { LoginService } from 'src/app/core/services/auth/login.service';
import { RentalService } from 'src/app/core/services/rental.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmationComponent } from '../dialog-confirmation/dialog-confirmation.component';


@Component({
    selector: 'app-form-reactivo',
    templateUrl: './form-reactivo.component.html',
    styleUrls: ['./form-reactivo.component.css']
})

export class FormReactivoComponent implements OnInit, OnDestroy {
    @Input() idCar!: string;
    @Input() cars?: Car | undefined;
    @Output() stepChanged = new EventEmitter<number>();


    arrRequest!: Request[]
    range!: UntypedFormGroup;
    private subscriptions: Subscription[] = [];

    userId!: string;
    username?: string;
    success!: boolean
    loading: boolean = true

    constructor(
        private readonly fb: UntypedFormBuilder,
        private authSvc: LoginService,
        private rentalSvc: RentalService,
        public dialog: MatDialog
    ) { }


    ngOnInit(): void {
        this.subscriptions.push(
            this.authSvc._user$.subscribe((res) => {
                this.userId = res.sub;
                this.username = res.username;
            })
        )
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
                initialDate: this.range.value.start,
                finalDate: this.range.value.end,
                user_id: this.userId,
                car_id: this.idCar,
                state: 'req'
            }
            if (this.range.valid) {
                // Marca paso 2 como completo
                this.stepChanged.emit(2); // Paso 3 (confirmación)
            }
            const dialogRef = this.dialog.open(DialogConfirmationComponent, {
                data: {
                    ...result, onConfirm: () => {
                        console.log('Solicitud confirmada');
                        this.stepChanged.emit(3); // ✅ PASO 3 COMPLETO
                        //   this.showSuccess.emit();  // ✅ Mostrar app-success si querés
                    }
                }
            });

            dialogRef.afterClosed().subscribe((result) => {
                console.log('El diálogo se cerró con el resultado:', result);

                if (result === true) {
                    // Confirmado
                } else if (result === 'cancelled') {
                    // Cancelación con botón
                    this.stepChanged.emit(1);
                } else {
                    this.stepChanged.emit(1);
                    // Cierre fuera del diálogo
                }
            });
        }
    };

    initFormDates(): UntypedFormGroup {
        return this.fb.group({
            start: new UntypedFormControl(null),
            end: new UntypedFormControl(null),
            total: new UntypedFormControl(null),
            amount: new UntypedFormControl(0),
            days: new UntypedFormControl(0),
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((e) => e.unsubscribe())
    };

}
