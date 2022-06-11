import { Action, createReducer, on } from '@ngrx/store';
import * as CarActions from './car.actions';

import {Car} from '../../core/models/car.interface';
import listaCars from 'src/assets/json/db.json';

export interface State{
  loading:boolean,
    cars:Array<Car>
    car:Array<Car>
}
export const initialState: {
    loading:boolean,
    cars:Array<Car>
    car:Array<Car>
  }={
      loading:false,
      cars:[],
      car:[]
  }

  const _carReducer = createReducer(
    initialState,
    on(CarActions.loadCarEffect, (state,{carState}) => {
      return {...state,
        loading:true,
        cars:carState,
        car:carState,
      }}),
    on(CarActions.searchCar, (state,{brand,model})=>{
      if(brand==='' && model === '' ){
        return{...state,car:state.cars }
      }else{
        let arr = state.cars.filter((e):any=>{
          if(e.brand.toLocaleLowerCase().includes(brand.toLocaleLowerCase())){
            return e
          }
        });
        if(model!==''){
          arr = arr.filter((e):any=>{
            if(e.model.toLocaleLowerCase().includes(model.toLocaleLowerCase())){
              return e
            }
          })
        }
          return{...state,car:arr }
      }


    }),
    on(CarActions.orderPriceCar, (state,{asc})=>{
      let nuevo= [...state.car];
      nuevo = nuevo.sort(function(a, b) {
        if (a.price > b.price) {
          return asc?1:-1;
        }
        if (a.price < b.price) {
          return asc? -1:1;
        }
        return 0;
      })
      return {...state,
        car: nuevo
      }}),
      on(CarActions.orderBrandCar, (state,{asc})=>{
        let nuevoOrden= [...state.car];
        nuevoOrden = nuevoOrden.sort(function(a, b) {
          if (a.brand > b.brand) {
            return asc?1:-1;
          }
          if (a.brand < b.brand) {
            return asc? -1:1;
          }
          return 0;
        })
        return {...state,
          car: nuevoOrden
        }}),
        on(CarActions.orderYearCar, (state,{asc})=>{
          let nuevoOrden= [...state.car];
          nuevoOrden = nuevoOrden.sort(function(a, b) {
            if (a.year > b.year) {
              return asc?1:-1;
            }
            if (a.year < b.year) {
              return asc? -1:1;
            }
            return 0;
          })
          return {...state,
            car: nuevoOrden
          }}),
  );

  export function carReducer(state: State | undefined, action: Action) {
    return _carReducer(state, action);
  }

  export const reducerKey = 'autos';
