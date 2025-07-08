import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.css']
})
export class FormInputComponent implements OnInit {
  @Input() control!: FormControl;
  @Input() label!: string;
  @Input() type: 'text' | 'email' | 'password' = 'text';
  @Input() placeholder: string = '';
  @Input() showTogglePassword: boolean = false;

  hidePassword: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  get showError(): boolean {
    return this.control?.touched && this.control?.invalid;
  }

  togglePassword(): void {
    this.hidePassword = !this.hidePassword;
  }
}

