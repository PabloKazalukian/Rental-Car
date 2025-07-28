import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-btn',
    templateUrl: './btn.component.html',
    styleUrls: ['./btn.component.scss']
})
export class BtnComponent {

    @Input() text: string = '';
    @Input() isDisabled: boolean = false;
    @Input() variant: 'basic' | 'raised' | 'stroked' | 'outline' | 'ghost' = 'basic';
    @Input() color: 'primary' | 'secondary' | 'surface' | 'success' | 'error' | 'text' | 'confirm' = 'primary';
    @Input() routerLink?: string = '';
    @Input() buttonType: 'button' | 'submit' | 'reset' = 'button';

}
