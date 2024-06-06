import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Car } from 'src/app/core/models/car.interface';
import { request, requestSend } from 'src/app/core/models/request.interface';
import { LoginService } from 'src/app/services/login.service';
import { RentalService } from 'src/app/services/rental.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ownValidation, getDays } from './calendar/app.validator';
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


    userId?: number
    username?: string;
    success!: boolean
    loading: boolean = true

    constructor(
        private readonly fb: FormBuilder,
        private authSvc: LoginService,
        private rentalSvc: RentalService,
        private router: Router,
        public dialog: MatDialog
    ) { }


    ngOnInit(): void {
        this.subscripcions.push(
            this.authSvc.readToken().subscribe((res) => {
                this.userId = res.userId;
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
        )

    }

    onSubmit(): void {
        let start = new DatePipe('en').transform(this.range.value.start, 'yyyy-MM-dd');
        let end = new DatePipe('en').transform(this.range.value.end, 'yyyy-MM-dd');

        if (start && end) {
            let result: requestSend = {
                initial_date: start,
                final_date: end,
                created_by: this.userId,
                rented_car: parseInt(this.idCar, 10),
                stateReq: true
            }
            this.dialog.open(DialogConfirmationComponent, { data: result });
        }
    }

    initFormDates(res: request[] | null): FormGroup {
        return this.fb.group({
            start: new FormControl(null),
            end: new FormControl(null),
            total: new FormControl(res),
            amount: new FormControl(0),
            days: new FormControl(0)
        }, {
            validators:
                ownValidation.dateCorrect
        });
    }

    ngOnDestroy(): void {
        this.subscripcions.forEach((e) => e.unsubscribe())
    }

}
