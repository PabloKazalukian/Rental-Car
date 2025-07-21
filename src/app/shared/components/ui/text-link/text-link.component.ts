import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-text-link',
    templateUrl: './text-link.component.html',
    styleUrls: ['./text-link.component.css']
})
export class TextLinkComponent {
    @Input() text: string = '';
    @Input() routerLink: string = '';
    @Input() color: 'primary' | 'secondary' | 'surface' | 'success' | 'error' | 'text' | 'confirm' = 'primary';
}
