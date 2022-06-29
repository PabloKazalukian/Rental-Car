import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms"
import { DatePipe } from '@angular/common';
import { request } from 'src/app/core/models/request.interface';

export class repeatPass {
  static dateCorrect(control: AbstractControl): ValidationErrors| null {
    if(control.value.password1 === control.value.password2){
      return null
    }else return { dateIncorrect: true }
  }

}
