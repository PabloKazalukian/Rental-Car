import { Action, createReducer, on } from '@ngrx/store';
import * as CarActions from './car.actions';

import {Car} from '../../core/models/car.interface';
import listaCars from 'src/assets/json/db.json';

export const initialState: {
    loading:boolean,
    cars:Array<Car>
    car:Array<Car>
  }={
      loading:false,
      cars:[],
      car:[]
  }

  export const carReducer = createReducer(
    initialState,
    on(CarActions.loadCar, (state) => {
      return {...state,
        loading:true,
        cars:listaCars,
        car:listaCars,
      }}),
    on(CarActions.searchCar, (state,{brand,model})=>{
      if(brand==='' && model === '' ){
        return{...state,car:state.cars }
      }else{
        let arr = state.cars.filter((e):any=>{
          if(e.Brand.toLocaleLowerCase().includes(brand.toLocaleLowerCase())){
            return e
          }
        });
        if(model!==''){
          arr = arr.filter((e):any=>{
            if(e.Model.toLocaleLowerCase().includes(model.toLocaleLowerCase())){
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
        if (a.Price > b.Price) {
          return asc?1:-1;
        }
        if (a.Price < b.Price) {
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
          if (a.Brand > b.Brand) {
            return asc?1:-1;
          }
          if (a.Brand < b.Brand) {
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
            if (a.Year > b.Year) {
              return asc?1:-1;
            }
            if (a.Year < b.Year) {
              return asc? -1:1;
            }
            return 0;
          })
          return {...state,
            car: nuevoOrden
          }}), 
  );

  export const reducerKey = 'autos';