import { CarService } from './../../services/car.service';
import { Injectable } from "@angular/core";
import {createEffect,Actions,ofType} from '@ngrx/effects';
import * as CarActions from './car.actions';
import {catchError,map,mergeMap,tap} from 'rxjs/operators'


import { EMPTY } from 'rxjs';
 
@Injectable()
export class carEffects {
    getCarDataEffect$ = createEffect(() => {

        return this.actions$.pipe(
            ofType(CarActions.loadCar),
            mergeMap(() => this.carService.getAllCars()
            .pipe(
                
                map(carState => ({ type: '[CAR LIST] Load all Cars',  carState })),
                catchError(() => EMPTY)
            ))
        )
    })
    
 
  constructor(
    private actions$: Actions,
    private carService: CarService
  ) {}
}