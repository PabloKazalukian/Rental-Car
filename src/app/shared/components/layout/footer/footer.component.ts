import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TextLinkComponent } from '../../ui/text-link/text-link.component';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
    standalone: true,
    imports: [TextLinkComponent, RouterLink]
})
export class FooterComponent {
    isExternal = true;
}
