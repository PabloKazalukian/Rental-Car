import { createAction, props } from '@ngrx/store';
import {Car} from 'src/app/core/models/car.interface'

interface text{
    model:string | '',
    brand:string |''
  }
  
export const loadCar = createAction('[Car List] load car');
export const searchCar = createAction('[Car List] search car',props<{ brand: string,model:string; }>());
export const orderPriceCar = createAction('[Car List] order Pricecar',props<{ asc:boolean; }>())
export const orderBrandCar = createAction('[Car List] order Brandcar',props<{ asc:boolean; }>())
export const orderYearCar = createAction('[Car List] order Yearcar',props<{ asc:boolean; }>())