import { AbstractControl, ValidationErrors } from "@angular/forms"

export class repeatPass {
    static samePassword(control: AbstractControl): ValidationErrors | null {
        if ((control.value.password1.length >= 3) && (control.value.password2.length >= 3) && (control.value.password1 !== control.value.password2)) {
            return { passNoRepeat: true }
        } else return null
    }
}
