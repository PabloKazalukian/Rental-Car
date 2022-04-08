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
    on(CarActions.loadCar, (state) => { console.log(listaCars)
      return {...state,
        loading:true,
        cars:listaCars,
        car:listaCars,
      }}),
      on(CarActions.searchCar, (state,{brand})=>{
        if(brand===''){
          return{...state,car:state.cars }
        }else{
          let arr = state.cars.filter((e):any=>{
            if(e.Brand.toLocaleLowerCase().includes(brand.toLocaleLowerCase())){return e}}
          );
            return{...state,car:arr }
        }

        
      })
  );

  export const reducerKey = 'autos';