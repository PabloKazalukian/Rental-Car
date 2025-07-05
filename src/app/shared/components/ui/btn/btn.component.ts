import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-btn',
    templateUrl: './btn.component.html',
    styleUrls: ['./btn.component.css']
})
export class BtnComponent implements OnInit {

    @Input() text: string = '';
    @Input() isDisabled: boolean = false;
    @Input() variant: string = 'basic'; // 'basic', 'raised' or 'outline'
    @Input() color: string = 'primary'; // 'primary', 'secundary', 'surface', 'success', ' error', 'confirm'.
    @Input() routerLink?: string = '';
    @Input() buttonType: 'button' | 'submit' | 'reset' = 'button';

    constructor() { }

    ngOnInit(): void {
    }

}
