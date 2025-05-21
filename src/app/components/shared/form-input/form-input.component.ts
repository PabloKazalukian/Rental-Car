import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
    selector: 'app-form-input',
    templateUrl: './form-input.component.html',
    styleUrls: ['./form-input.component.css']
})
export class FormInputComponent {
    @Input() label!: string;
    @Input() type: string = 'text';
    @Input() placeholder: string = '';
    @Input() control!: FormControl | AbstractControl;
    @Input() name!: string;
    @Input() errorMessages!: { [key: string]: string };
    @Input() hideToggle: boolean = false;
    hide: boolean = true;

    public Object = Object;

    get errorKeys(): string[] {
        return this.control?.errors ? Object.keys(this.control.errors) : [];
    }
}
