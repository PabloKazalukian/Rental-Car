import { Component, Input } from '@angular/core';
import { COLOR_VALUES } from 'src/app/shared/utils/color.type';

@Component({
    selector: 'app-text-link',
    templateUrl: './text-link.component.html'
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
