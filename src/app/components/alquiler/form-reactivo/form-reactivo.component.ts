import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Car } from 'src/app/core/models/car.interface';
import { request, requestSend } from 'src/app/core/models/request.interface';
import { LoginService } from 'src/app/services/login.service';
import { RentalService } from 'src/app/services/rental.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmationComponent } from './dialog-confirmation/dialog-confirmation.component';


@Component({
    selector: 'app-form-reactivo',
    templateUrl: './form-reactivo.component.html',
    styleUrls: ['./form-reactivo.component.css']
})

export class FormReactivoComponent implements OnInit, OnDestroy {
    @Input() idCar!: string;
    @Input() cars?: Car | undefined;


    arrRequest!: request[]
    range!: FormGroup;
    private subscripcions: Subscription[] = [];


    userId!: string;
    username?: string;
    success!: boolean
    loading: boolean = true

    constructor(
        private readonly fb: FormBuilder,
        private authSvc: LoginService,
        private rentalSvc: RentalService,
        public dialog: MatDialog
    ) { }


    ngOnInit(): void {
        this.subscripcions.push(
            this.authSvc.readToken().subscribe((res) => {
                this.userId = res.sub;
                this.username = res.username;
            })
        )
        this.range = this.initFormDates(null);
        this.subscripcions.push(
            this.rentalSvc.getRequestById(this.idCar).subscribe((res) => {
                setTimeout(() => this.loading = false, 1000)
                this.arrRequest = res;
                this.range = this.initFormDates(res);
            })
        );
    }

    onSubmit(): void {
        let start = new DatePipe('en').transform(this.range.value.start, 'yyyy-MM-dd');
        let end = new DatePipe('en').transform(this.range.value.end, 'yyyy-MM-dd');

        if (start && end) {
            let result: requestSend = {
                amount: this.range.value?.amount,
                initialDate: this.range.value.start,
                finalDate: this.range.value.end,
                user_id: this.userId,
                car_id: this.idCar,
                state: 'req'
            }
            this.dialog.open(DialogConfirmationComponent, { data: result });
        }
    };

    initFormDates(res: request[] | null): FormGroup {
        return this.fb.group({
            start: new FormControl(null),
            end: new FormControl(null),
            total: new FormControl(res),
            amount: new FormControl(0),
            days: new FormControl(0)
        })
        // {
        //     validators:
        //         ownValidation.dateCorrect
        // });
    };

    ngOnDestroy(): void {
        this.subscripcions.forEach((e) => e.unsubscribe())
    };

}
