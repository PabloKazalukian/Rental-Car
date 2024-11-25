import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Car } from '../core/models/car.interface';
import { Response } from '../core/models/response.interface';

@Injectable({
    providedIn: 'root'
})
export class CarService {
    private readonly API = `${environment.api}/car`;

    constructor(private readonly http: HttpClient) { }

    getAllCars(): Observable<Car[]> {
        return this.http.get<Response<Car[]>>(this.API).pipe(map(response => response.data));
    }

    getCarById(id: string): Observable<Car[]> {
        return this.http.get<Response<Car[]>>(`${this.API}/id/${id}`).pipe(map(response => response.data));
    }
}
