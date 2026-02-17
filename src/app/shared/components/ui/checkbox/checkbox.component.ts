import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule],
})
export class CheckboxComponent {
    @Input() control!: FormControl<boolean>;
    @Input() text = '';
}

