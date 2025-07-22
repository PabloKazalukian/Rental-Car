import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-text-link',
    templateUrl: './text-link.component.html',
    styleUrls: ['./text-link.component.css']
})
export class TextLinkComponent implements OnInit {
    @Input() isExternal: boolean = false;
    @Input() text: string = '';
    @Input() routerLink: string = '';
    @Input() color: 'primary' | 'secondary' | 'surface' | 'success' | 'error' | 'text' | 'confirm' = 'primary';

    ngOnInit(): void {
        console.log(this.isExternal)
    }
    warnBeforeLeaving(event: MouseEvent) {
        const confirmed = window.confirm('Estás por salir del sitio. ¿Continuar?');
        if (!confirmed) {
            event.preventDefault();
        }
    }

}
