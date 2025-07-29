import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

export interface SelectType {
    name: string,
    value: number | string
}

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss']
})
export class SelectComponent {

    @Input() text: string = '';
    @Input() label!: string;
    @Input() placeholder: string = '';
    @Input() options: SelectType[] = [];
    @Input() isDisabled: boolean = false;
    @Input() control!: FormControl<string | null>;

}
