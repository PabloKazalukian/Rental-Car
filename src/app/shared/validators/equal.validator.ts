import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { error } from 'console';

export function mustBeDifferent(field1: string, field2: string, obj: any): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {

        const c1 = group.get(field1);
        const c2 = group.get(field2);

        if (!c1 || !c2) return null;

        //clear error
        c1.setErrors(null);
        c2.setErrors(null);

        const lastModified = group.get(field1)?.dirty ? group.get(field1) : group.get(field2);

        if (group.get(field1)?.value === obj[field1] && group.get(field2)?.value === obj[field2]) {
            let error = { mustBeDifferent: true };
            lastModified?.setErrors(error);
            return error
        } else {
            lastModified?.setErrors(null);
            return null;
        }
    };
}
