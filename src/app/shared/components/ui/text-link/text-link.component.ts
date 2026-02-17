import { Component, Input } from '@angular/core';
import { COLOR_VALUES } from 'src/app/shared/utils/color.type';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-text-link',
    templateUrl: './text-link.component.html',
    standalone: true,
    imports: [NgClass, RouterLink]
})
export class TextLinkComponent {
    @Input() isExternal: boolean = false;
    @Input() text: string = '';
    @Input() routerLink: string = '';
    @Input() color: COLOR_VALUES = 'primary';

    warnBeforeLeaving(event: MouseEvent) {
        const confirmed = window.confirm('Estás por salir del sitio. ¿Continuar?');
        if (!confirmed) {
            event.preventDefault();
        }
    }

}
