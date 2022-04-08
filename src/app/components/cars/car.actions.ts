import { createAction, props } from '@ngrx/store';
import {Car} from 'src/app/core/models/car.interface'

export const loadCar = createAction('[Car List] load car');
export const searchCar = createAction('[Car List] search car',props<{ brand: string; }>());