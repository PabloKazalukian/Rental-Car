import { Component } from '@angular/core';
import { CarsComponent } from '../cars/cars.component';
import { HowToUseComponent } from './components/how-to-use/how-to-use.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [
        LandingPageComponent,
        HowToUseComponent,
        CarsComponent,
    ],
})
export class HomeComponent {}
