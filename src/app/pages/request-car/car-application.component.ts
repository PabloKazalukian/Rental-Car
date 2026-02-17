import { Component } from '@angular/core';
import { CarsComponent } from '../cars/cars.component';

@Component({
    selector: 'app-car-application',
    templateUrl: './car-application.component.html',
    styleUrls: ['./car-application.component.scss'],
    standalone: true,
    imports: [CarsComponent],
})
export class CarApplicationComponent {}
