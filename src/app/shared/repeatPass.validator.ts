import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms"
import { DatePipe } from '@angular/common';
import { request } from 'src/app/core/models/request.interface';

export class repeatPass {
    static dateCorrect(control: AbstractControl): ValidationErrors | null {
        if (control.value.password1 === control.value.password2) {
            return null
        } else return { dateIncorrect: true }
    }

}

// export function passwordMatchValidator(control: AbstractControl) {
//     const password1 = control.get('password1');
//     const password2 = control.get('password2');
//     if (password1 && password2 && password1.value !== password2.value) {
//         password2.setErrors({ passwordMismatch: true });
//     } else {
//         return null;
//     }
// }
