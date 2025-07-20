import { AbstractControl, ValidationErrors } from "@angular/forms";
import { DatePipe } from '@angular/common';
import { Request } from 'src/app/core/models/request.interface';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(isSameOrAfter);
dayjs.extend(customParseFormat);

export class ownValidation {
    static dateCorrect(control: AbstractControl): ValidationErrors | null {
        // console.log('Validating date range:', control.value);
        const start = new DatePipe('en').transform(control.value.start, 'dd-MM-yyyy');
        const end = new DatePipe('en').transform(control.value.end, 'dd-MM-yyyy');

        if (start !== null && end) {
            const hasOverlap = control.value.total.filter((res: Request) => {
                return containDateDouble(start, end, res.initialDate, res.finalDate);
            }).length > 0;

            return hasOverlap ? { dateCorrect: true } : null;
        } else {
            return { dateCorrect: true };
        }
    }
}

/**
 * Compara dos fechas (string o Date).
 * includ: si true, incluye igualdad (>=), sino solo mayor (>).
 */
export const isDateHigher = (date1: string | Date, date2: string | Date, includ: boolean): boolean => {
    const dayjsDate1 = dayjs(date1, 'D/M/YYYY', true);
    const dayjsDate2 = dayjs(date2, 'D/M/YYYY', true);

    if (includ) {
        return dayjsDate1.isSameOrAfter(dayjsDate2);
    } else {
        return dayjsDate1.isAfter(dayjsDate2);
    }
};

/**
 * Verifica que start >= compareStart y end >= compareEnd (ambos inclusive)
 */
export const containDateDouble = (
    start: string | null,
    end: string | null,
    compareStart: string,
    compareEnd: string
): boolean => {
    if (start !== null && end !== null) {
        if (isDateHigher(start, compareStart, true) && isDateHigher(end, compareEnd, true)) {
            return true;
        }
    }
    return false;
};

/**
 * Obtiene diferencia de días entre dos fechas en formato 'D/M/YYYY'
 */
export const getDays = (f1: string, f2: string): number => {
    console.log('Calculating days between:', f1, f2);
    const date1 = dayjs(f1, 'D/M/YYYY', true);
    const date2 = dayjs(f2, 'D/M/YYYY', true);

    if (!date1.isValid() || !date2.isValid()) return 0;

    // Diferencia en días + 1 (como original)
    return date2.diff(date1, 'day') + 1;
};

export const getDaysDate = (f1: Date, f2: Date): number => {
    // const date1 = dayjs(f1, 'D/M/YYYY', true);
    const date1 = dayjs(f1)
    const date2 = dayjs(f2)

    return date2.diff(date1, 'day');
};

export const changeDateFormat = (date: string | Date): string => {
    if (typeof date === 'string') {
        const parts = date.split('-');
        if (parts.length === 3) {
            // console.log('Changing date format from YYYY-MM-DD to DD/MM/YYYY:', date);
            return `${parts[2]}/${parts[1]}/${parts[0]}`; // Cambia de 'YYYY-MM-DD' a 'DD/MM/YYYY'
        }
    } else if (date instanceof Date) {
        return new DatePipe('en').transform(date, 'yyyy/MM/dd') || '';
    }
    return '';
}

/**
 * Formatea fecha a formato local en DD/MM/YYYY o similar según navegador
 */
export const formatDateToLocale = (date: string | Date): string => {
    const fecha = new Date(date);
    return new Intl.DateTimeFormat(navigator.language, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).format(fecha);
};

