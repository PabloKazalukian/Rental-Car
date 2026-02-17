import { Component, Input, OnInit } from '@angular/core';
import { ScrollAnimateDirective } from '../../../directives/scroll-animate.directive';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
    standalone: true,
    imports: [ScrollAnimateDirective]
})
export class AuthComponent implements OnInit {

    @Input() imageBackground: string = '';
    imageUrl: string = 'assets/images/logo-no-background.png';

    constructor() { }

    ngOnInit(): void {
    }

}
1
