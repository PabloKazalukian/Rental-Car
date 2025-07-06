import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-btn',
    templateUrl: './btn.component.html',
    styleUrls: ['./btn.component.css']
})
export class BtnComponent implements OnInit {

    @Input() text: string = '';
    @Input() isDisabled: boolean = false;
    @Input() variant: 'basic' | 'raised' | 'stroked' | 'outline' |'ghost'  = 'basic';
    @Input() color: 'primary' | 'secondary'| 'surface' | 'success' | 'error' | 'text' | 'confirm' = 'primary';
    @Input() routerLink?: string = '';
    @Input() buttonType: 'button' | 'submit' | 'reset' = 'button';

    constructor() { }

    ngOnInit(): void {
    }

}
