import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { CarService } from '../services/car.service';
import { Car } from '../core/models/car.interface';

const cars = ['auto1', 'auto2']

@Injectable({ providedIn: 'root' })
export class DataResolverService implements Resolve<any> {

    car!: Observable<Car[]>;
    autos!: Car[];

    constructor(private readonly carSvc: CarService) { }

    resolve(): Observable<any> {
        //TODO: CALL SERVICE}
        this.car = this.carSvc.getCarById('1');

        return of(this.car);
    }
}
