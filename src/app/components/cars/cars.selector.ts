import { Car } from './../../../../../Api-Rental-Car/src/interfaces/car.interface';
import { createFeatureSelector,createSelector } from "@ngrx/store";
import * as carReducer from './cars.reducers';

export interface initialState {
    loading:boolean,
    cars:Array<Car>
    car:Array<Car>
  }

// const getLoad = (state:Car[]):string => state.car;
export const getCarState = createFeatureSelector<initialState>('autos');

export const getCar = createSelector(
    getCarState,
    (state:initialState)=>state.car
);
