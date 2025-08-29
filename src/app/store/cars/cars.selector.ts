import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Car } from 'src/app/core/models/car.interface';

export interface initialState {
    loading: boolean;
    cars: Array<Car>;
    car: Array<Car>;
}

// const getLoad = (state:Car[]):string => state.car;
export const getCarState = createFeatureSelector<initialState>('autos');

export const getCar = createSelector(getCarState, (state: initialState) => state.car);
