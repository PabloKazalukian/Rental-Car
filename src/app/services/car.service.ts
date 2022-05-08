import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../core/models/car.interface';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private readonly API= environment.api;

  constructor(private readonly http:HttpClient) { }

  getAllCars():Observable<Car[]>{
    return this.http.get<Car[]>(this.API)
  }
}
