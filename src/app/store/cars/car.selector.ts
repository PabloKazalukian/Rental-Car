import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Car } from '../../core/models/car.interface';
import * as carReducer from './cars.reducers';

export const selectCars = (state: any) => state.selectedCar

export const getCars = createFeatureSelector<Car>('autos')