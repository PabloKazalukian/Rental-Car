import { Component, Input, OnInit, AfterViewInit, ViewChild, OnDestroy, EventEmitter } from '@angular/core';

import { Options } from 'flatpickr/dist/types/options';

// Removed FlatpickrOptions type import as it does not exist in 'angularx-flatpickr'

import { UntypedFormGroup, UntypedFormBuilder, UntypedFormControl } from '@angular/forms';
import { RentalService } from 'src/app/core/services/rental.service';
import { Request } from 'src/app/core/models/request.interface';
import { MatDateRangePicker } from '@angular/material/datepicker';
import { delay, take } from "rxjs/operators";
import { isDateHigher, getDays, getDaysDate } from '../../../../shared/validators/date.validator';
import { Subscription } from 'rxjs';
import { Car } from 'src/app/core/models/car.interface';

interface requsitio { initial_date: string, final_date: string }

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit, AfterViewInit, OnDestroy {

    flatpickrOptions = {
        mode: 'range',
        dateFormat: 'Y-m-d',
        disable: [] as string[],
        minDate: 'today',
        onClose: this.handleDateSelection.bind(this),
    };


    onClose?: EventEmitter<Event>


    @ViewChild(MatDateRangePicker) datepicker!: MatDateRangePicker<Date>;

    @Input() range!: UntypedFormGroup
    @Input() idCar!: string;
    @Input() cars?: Car;

    private subscripcions: Subscription[] = [];

    arrRequest!: Request[];
    blockedDates: Set<string> = new Set();


    constructor(private readonly fb: UntypedFormBuilder, private rentalSvc: RentalService) { }
    ngAfterViewInit() {
        // this.resubscribe();
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
                    console.log('Re-subscribing to datepicker openedStream', this.arrRequest);
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
                console.log('Petición de reserva:', res);
                this.calculateBlockedDates(); // Precalcular fechas bloqueadas
            })
        )
    };

    // calculateBlockedDates(): void {
    //     this.blockedDates.clear();

    //     this.arrRequest.forEach(res => {
    //         let current = new Date(res.initialDate);
    //         let end = new Date(res.finalDate);

    //         while (current <= end) {
    //             this.blockedDates.add(this.formatDate(current)); // Guardamos en el Set
    //             current.setDate(current.getDate() + 1);
    //         }
    //     });
    // }
    calculateBlockedDates(): void {
        const dates: string[] = [];
        this.arrRequest.forEach(res => {
            let current = new Date(res.initialDate);
            let end = new Date(res.finalDate);
            while (current <= end) {
                dates.push(this.formatDate(current));
                current.setDate(current.getDate() + 1);
            }
        });
        this.disabledDates = dates;
    }

    handleDateClose() {
        const selectedDates = this.range.value.start;
        if (Array.isArray(selectedDates) && selectedDates.length === 2) {
            const [start, end] = selectedDates;
            const days = getDaysDate(start, end);
            this.range.patchValue({
                start,
                end,
                days,
                amount: this.cars?.price ? this.cars.price * days : 0
            });
        } else {
            this.range.patchValue({ days: 0, amount: 0 });
        }
    }



    formatDate(date: Date): string {
        return date.toISOString().split('T')[0]; // "2025-04-07"
    }

    myFilter = (date: Date): boolean => {

        const dateToday: Date = new Date();

        return isDateHigher(date, dateToday, false) && !this.blockedDates.has(this.formatDate(date));
    };

    onDate(start: any, end: any): void {
        let days = 1;
        if (!this.range.invalid) {
            if (start.value.length > 1 && end.value.length > 1) {
                console.log('Fechas seleccionadas:', getDays(start.value, end.value), start.value);
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

    get startControl(): UntypedFormControl {
        return this.range.get('start') as UntypedFormControl;
    }

    disabledDates: string[] = []; // 🟡 usado en [disable]

    handleDateSelection(selectedDates: Date[]) {
        if (selectedDates.length === 2) {
            const [start, end] = selectedDates;
            const days = getDaysDate(start, end);
            this.range.patchValue({
                start,
                end,
                days,
                amount: this.cars?.price ? this.cars.price * days : 0
            });
        } else {
            this.range.patchValue({ days: 0, amount: 0 });
        }
    }



    ngOnDestroy(): void {
        this.subscripcions.forEach((e) => e.unsubscribe())
    };
}
