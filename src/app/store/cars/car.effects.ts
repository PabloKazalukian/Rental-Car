import { CarService } from '../../core/services/car.service';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as CarActions from './car.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { Observable } from 'rxjs';

@Injectable()
export class carEffects {
    getCarDataEffect$ = createEffect((): Observable<any> => {
        return this.actions$.pipe(
            ofType(CarActions.loadCar),
            mergeMap(() =>
                this.carService.getAllCars().pipe(
                    map((carState) => ({ type: '[CAR LIST] Load all Cars', carState })),
                    catchError((error) => {
                        return error; //return from(['A','B','C'])
                    }),
                ),
            ),
        );
    });

    constructor(
        private actions$: Actions,
        private carService: CarService,
    ) {}
}
