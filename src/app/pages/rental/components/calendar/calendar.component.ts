import { Component, Input, OnInit, ViewChild, OnDestroy, EventEmitter, } from '@angular/core';
// import { FlatpickrOptions } from 'ngx-flatpickr-wrapper'
import { Options } from 'flatpickr/dist/types/options';

// Removed FlatpickrOptions type import as it does not exist in 'angularx-flatpickr'

import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { RentalService } from 'src/app/core/services/rental.service';
import { Request } from 'src/app/core/models/request.interface';
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

    // onClose?: EventEmitter<Event>

    @Input() range!: UntypedFormGroup
    @Input() idCar!: string;
    @Input() cars?: Car;

    private subscripcions: Subscription[] = [];

    arrRequest!: Request[];
    blockedDates: Set<string> = new Set();
    disabledDates: string[] = []; // 🟡 usado en [disable]

    constructor(private rentalSvc: RentalService) { }

    ngOnInit(): void {
        this.subscripcions.push(
            this.rentalSvc.getRequestById(this.idCar).subscribe(res => {
                this.arrRequest = res;
                this.calculateBlockedDates(); // Precalcular fechas bloqueadas
            })
        )
    };

    onInputChange(value: string) {

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
        } else {
            this.range.patchValue({ days: 0, amount: 0, start: null, end: null, });
        }
    };

    parseDate(str: string): Date {
        const [day, month, year] = str.split('-').map(Number);
        return new Date(year, month - 1, day);
    };

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

    formatDate(date: Date): string {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // enero = 0
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }

    ngOnDestroy(): void {
        this.subscripcions.forEach((e) => e.unsubscribe())
    };
}
