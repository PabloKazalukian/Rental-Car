import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule]
})
export class FormInputComponent {

    @Input() control!: FormControl<string | null>;
    @Input() label!: string;
    @Input() type: 'text' | 'email' | 'password' = 'text';
    @Input() placeholder: string = '';
    @Input() showTogglePassword: boolean = false;

    hidePassword: boolean = true;

    get showError(): boolean {
        return this.control?.touched && this.control?.invalid;
    }

    togglePassword(): void {
        this.hidePassword = !this.hidePassword;
    }
}

