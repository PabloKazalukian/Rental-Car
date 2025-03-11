import { Component, Input, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';

import { FormGroup, FormBuilder } from '@angular/forms';
import { RentalService } from 'src/app/services/rental.service';
import { request } from 'src/app/core/models/request.interface';
import { MatDateRangePicker } from '@angular/material/datepicker';
import { delay, take } from "rxjs/operators";
import { isDateHigher, getDays } from './app.validator';
import { Subscription } from 'rxjs';
import { Car } from 'src/app/core/models/car.interface';

interface requsitio { initial_date: string, final_date: string }

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild(MatDateRangePicker) datepicker!: MatDateRangePicker<Date>;

    @Input() range!: FormGroup
    @Input() idCar!: string;
    @Input() cars?: Car;

    private subscripcions: Subscription[] = [];

    arrRequest!: request[]


    constructor(private readonly fb: FormBuilder, private rentalSvc: RentalService) { }
    ngAfterViewInit() {
        this.resubscribe();
    };

    resubscribe() {
        this.subscripcions.push(
            this.datepicker.openedStream
                .pipe(
                    take(1),
                    delay(2)
                )
                .subscribe(() => {
                    // isDateHigher
                    this.arrRequest
                    this.datepicker.disabled = false;
                    this.datepicker.open();
                    this.resubscribe();
                })
        )
    };

    ngOnInit(): void {
        this.subscripcions.push(
            this.rentalSvc.getRequestById(this.idCar).subscribe(res => {
                this.arrRequest = res;
            })
        )
    };

    myFilter = (date: Date): boolean => {
        console.log(date)
        let output = String(date.getDate()).padStart(2, '0') + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + date.getFullYear();
        const datejs: Date = new Date();
        const jsFinalDate = `${datejs.getDate()}-${datejs.getMonth() + 1}-${datejs.getFullYear()}`;
        return (isDateHigher(output, true, jsFinalDate, false)) &&
            (this.arrRequest.filter(res => isDateHigher(output, true, res.initialDate, true) && isDateHigher(output, false, res.finalDate, true)).length < 1)
    };

    onDate(start: any, end: any): void {
        let days = 1;
        if (!this.range.invalid) {
            if (start.value.length > 1 && end.value.length > 1) {
                days = getDays(start.value, end.value);
            }
            if (this.cars?.price !== undefined) {
                this.range.value.days = days;
                this.range.value.amount = days * this.cars.price;
            } else {
                this.range.value.days = 0;
                this.range.value.amount = 0
            }
        }
    };

    ngOnDestroy(): void {
        this.subscripcions.forEach((e) => e.unsubscribe())
    };

}
