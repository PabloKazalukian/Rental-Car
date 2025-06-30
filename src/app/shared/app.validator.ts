import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms"
import { DatePipe } from '@angular/common';
import { request } from 'src/app/core/models/request.interface';
import moment from 'moment';

export class ownValidation {
    static dateCorrect(control: AbstractControl): ValidationErrors | null {

        const start = new DatePipe('en').transform(control.value.start, 'dd-MM-yyyy');
        const end = new DatePipe('en').transform(control.value.end, 'dd-MM-yyyy');
        if (start !== null && end) {
            if (control.value.total.filter((res: request) => {
                return containDateDouble(start, end, res.initialDate, res.finalDate)
            }).length < 1) return null;
            else return { dateCorrect: true }
        }
        else
            return { dateCorrect: true }
    }

}
export const isDateHigher = (date1: string | Date, date2: string | Date, includ: boolean): boolean => {
    //La función recibe dos fechas como parámetros y un booleano includ. Si includ es true, permite que las fechas sean iguales al compararlas. La primera fecha siempre se evalúa para verificar si es mayor que la segunda.


    const format: string = 'D/M/YYYY'
    const momentDate1 = moment(date1);
    const momentDate2 = moment(date2);

    // console.log(momentDate1.toString(), momentDate2.toDate())
    return includ ? momentDate1.isSameOrAfter(momentDate2) : momentDate1.isAfter(momentDate2);
};

export const containDateDouble = (start: string | null, end: string | null, compareStart: string, compareEnd: string): boolean => {

    if (start !== null && end !== null) {
        if (isDateHigher(start, compareStart, true) && isDateHigher(end, compareEnd, true)) {
            return true
        }
    }
    return false
}

export const getDays = (f1: string, f2: string) => {
    // if(f1){}
    let aFecha1: string[] = f1.split('/');
    let aFecha2: string[] = f2.split('/');
    let fFecha1 = Date.UTC(parseInt(aFecha1[2], 10), parseInt(aFecha1[0], 10) - 1, parseInt(aFecha1[1], 10));
    let fFecha2 = Date.UTC(parseInt(aFecha2[2], 10), parseInt(aFecha2[0], 10) - 1, parseInt(aFecha2[1], 10));
    let dif = fFecha2 - fFecha1;
    let dias = Math.floor(dif / (1000 * 60 * 60 * 24));
    return dias + 1;
}
