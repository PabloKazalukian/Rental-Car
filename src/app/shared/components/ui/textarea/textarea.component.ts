import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

@Component({
    selector: 'app-textarea',
    templateUrl: './textarea.component.html',
    styleUrls: ['./textarea.component.css']
})
export class TaxtareaComponent implements OnInit {

    @Input() control!: UntypedFormControl;
    @Input() label!: string;
    @Input() placeholder: string = '';


    constructor() { }

    ngOnInit(): void {
    }

    get showError(): boolean {
        return this.control?.touched && this.control?.invalid;
    }

}
