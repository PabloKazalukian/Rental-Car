import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss']
})
export class FormInputComponent implements OnInit {
    @Input() control!: FormControl;
    @Input() label!: string;
    @Input() type: 'text' | 'email' | 'password' = 'text';
    @Input() placeholder: string = '';
    @Input() showTogglePassword: boolean = false;

    hidePassword: boolean = true;

    constructor() { }

    ngOnInit(): void { }

    get showError(): boolean {
        return this.control?.touched && this.control?.invalid;
    }

    togglePassword(): void {
        this.hidePassword = !this.hidePassword;
    }
}

