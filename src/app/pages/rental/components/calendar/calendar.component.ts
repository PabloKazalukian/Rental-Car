import { Component, Input, OnInit, ViewChild, OnDestroy, EventEmitter, } from '@angular/core';
// import { FlatpickrOptions } from 'ngx-flatpickr-wrapper'
import { Options } from 'flatpickr/dist/types/options';

// Removed FlatpickrOptions type import as it does not exist in 'angularx-flatpickr'

import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { RentalService } from 'src/app/core/services/rental.service';
import { Request } from 'src/app/core/models/request.interface';
import { MatDateRangePicker } from '@angular/material/datepicker';
import { isDateHigher, getDaysDate } from '../../../../shared/validators/date.validator';
import { Subscription } from 'rxjs';
import { Car } from 'src/app/core/models/car.interface';


interface requsitio { initial_date: string, final_date: string }

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit, OnDestroy {

    onClose?: EventEmitter<Event>


    @ViewChild(MatDateRangePicker) datepicker!: MatDateRangePicker<Date>;

    @Input() range!: UntypedFormGroup
    @Input() idCar!: string;
    @Input() cars?: Car;

    private subscripcions: Subscription[] = [];

    arrRequest!: Request[];
    blockedDates: Set<string> = new Set();
    disabledDates: string[] = []; // 🟡 usado en [disable]

    flatpickrOptions: Partial<Options> = {
        mode: 'range',
        dateFormat: 'd-m-Y',
        disable: this.disabledDates,
        minDate: 'today',
        onChange: this.handleDateChange.bind(this),
    };




    constructor(private readonly fb: UntypedFormBuilder, private rentalSvc: RentalService) { }

    ngOnInit(): void {
        this.subscripcions.push(
            this.rentalSvc.getRequestById(this.idCar).subscribe(res => {
                this.arrRequest = res;
                this.calculateBlockedDates(); // Precalcular fechas bloqueadas
            })
        )
    };

    onInputChange(value: string) {
        // console.log('Input value changed:', value);
        const [startStr, endStr] = value.split(' to ');
        // console.log('Parsed dates:', startStr, endStr);
        if (startStr && endStr) {
            const start = this.parseDate(startStr);
            const end = this.parseDate(endStr);
            const days = getDaysDate(start, end);
            // this.onDate(start, end);
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


    handleDateChange(selectedDates: any) {
        console.log('Fechas seleccionadas:', selectedDates);
        if (selectedDates.length === 2) {
            const [start, end] = selectedDates;
            const format = (d: Date) => `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`;
            const value = `${format(start)} to ${format(end)}`;

            // this.dateRangeControl.setValue(value);

            const days = getDaysDate(start, end);
            this.range.patchValue({
                days,
                amount: this.cars?.price ? this.cars.price * days : 0
            });
        } else {
            this.range.patchValue({ days: 0, amount: 0 });
        }
    }



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


    // handleDateClose() {
    //     const selectedDates = this.range.value.start;
    //     if (Array.isArray(selectedDates) && selectedDates.length === 2) {
    //         const [start, end] = selectedDates;
    //         const days = getDaysDate(start, end);
    //         this.range.patchValue({
    //             start,
    //             end,
    //             days,
    //             amount: this.cars?.price ? this.cars.price * days : 0
    //         });
    //     } else {
    //         this.range.patchValue({ days: 0, amount: 0 });
    //     }
    // }


    formatDate(date: Date): string {
        return date.toISOString().split('T')[0]; // "2025-04-07"
    }

    myFilter = (date: Date): boolean => {

        const dateToday: Date = new Date();

        return isDateHigher(date, dateToday, false) && !this.blockedDates.has(this.formatDate(date));
    };

    onDate(start: any, end: any): void {
        console.log('Selected dates:', start, end);
        let days = 1;
        // console.log('Range value:', this.range.invalid);
        // console.log(getDaysDate(start, end))
        // if (!this.range.invalid) {

        //     if (start.length > 1 && end.length > 1) {
        //         console.log('Fechas seleccionadas:', getDays(start.value, end.value), start.value);
        //         days = getDays(start.value, end.value);
        //     }
        //     if (this.cars?.price !== undefined) {
        //         this.range.value.days = days;
        //         this.range.value.amount = days * this.cars.price;
        //     } else {
        //         this.range.value.days = 0;
        //         this.range.value.amount = 0
        //     }
        // }
    };


    // handleDateSelection(selectedDates: Date[]) {
    //     if (selectedDates.length === 2) {
    //         const [start, end] = selectedDates;
    //         const days = getDaysDate(start, end);
    //         console.log(this.range.value);
    //         this.range.patchValue({
    //             start,
    //             end,
    //             days,
    //             amount: this.cars?.price ? this.cars.price * days : 0
    //         });
    //     } else {
    //         this.range.patchValue({ days: 0, amount: 0 });
    //     }
    // }

    handleDateClose(event: Event) {
        const input = event.target as HTMLInputElement;
        const value = input.value; // "27-07-2025 to 29-07-2025"
        const [startStr, endStr] = value.split(' to ');

        if (startStr && endStr) {
            const start = this.parseDate(startStr);
            const end = this.parseDate(endStr);
            const days = getDaysDate(start, end);

            this.range.patchValue({
                start,
                end,
                days,
                amount: this.cars?.price ? this.cars.price * days : 0
            });
        }
    }
    parseDate(str: string): Date {
        const [day, month, year] = str.split('-').map(Number);
        return new Date(year, month - 1, day);
    }


    ngOnDestroy(): void {
        this.subscripcions.forEach((e) => e.unsubscribe())
    };
}
