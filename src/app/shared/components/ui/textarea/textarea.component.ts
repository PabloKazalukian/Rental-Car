import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-textarea',
    templateUrl: './textarea.component.html',
    styleUrls: ['./textarea.component.scss']
})
export class TaxtareaComponent {

    @Input() control!: FormControl<string | null>;
    @Input() label!: string;
    @Input() placeholder: string = '';

    get showError(): boolean {
        return this.control?.touched && this.control?.invalid;
    }

}
