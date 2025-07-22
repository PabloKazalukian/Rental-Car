import { AbstractControl, ValidationErrors } from "@angular/forms";
import { DatePipe } from '@angular/common';
import { Request } from 'src/app/core/models/request.interface';
import { parse, isAfter, isEqual, isValid, differenceInDays } from 'date-fns';

export class ownValidation {
    static dateCorrect(control: AbstractControl): ValidationErrors | null {
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
 * includ: si true, incluye igualdad (>=), sino solo mayor.
 */
export const isDateHigher = (date1: string | Date, date2: string | Date, includ: boolean): boolean => {
    const format = 'd/M/yyyy';
    const d1 = typeof date1 === 'string' ? parse(date1, format, new Date()) : date1;
    const d2 = typeof date2 === 'string' ? parse(date2, format, new Date()) : date2;

    if (!isValid(d1) || !isValid(d2)) return false;

    return includ ? isAfter(d1, d2) || isEqual(d1, d2) : isAfter(d1, d2);
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
    const format = 'd/M/yyyy';
    const d1 = parse(f1, format, new Date());
    const d2 = parse(f2, format, new Date());

    if (!isValid(d1) || !isValid(d2)) return 0;

    return differenceInDays(d2, d1) + 1;
};

export const getDaysDate = (f1: Date, f2: Date): number => {
    if (!isValid(f1) || !isValid(f2)) return 0;

    return differenceInDays(f2, f1);
};

export const changeDateFormat = (date: string | Date): string => {
    if (typeof date === 'string') {
        const parts = date.split('-');
        if (parts.length === 3) {
            return `${parts[2]}/${parts[1]}/${parts[0]}`; // YYYY-MM-DD → DD/MM/YYYY
        }
    } else if (date instanceof Date) {
        return new DatePipe('en').transform(date, 'yyyy/MM/dd') || '';
    }
    return '';
};

export const formatDateToLocale = (date: string | Date): string => {
    const fecha = new Date(date);
    return new Intl.DateTimeFormat(navigator.language, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).format(fecha);
};


