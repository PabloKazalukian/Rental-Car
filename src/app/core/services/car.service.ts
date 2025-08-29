import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Car } from '../models/car.interface';
import { Response } from '../models/response.interface';
import { NotificationService } from './notifications/notification.service';

@Injectable({
    providedIn: 'root',
})
export class CarService {
    private firstConnectionNotified = false;
    private readonly API = `${environment.api}/car`;

    constructor(
        private readonly http: HttpClient,
        private notiService: NotificationService,
    ) {}

    getAllCars(): Observable<Car[]> {
        return this.http.get<Response<Car[]>>(this.API).pipe(
            tap(() => {
                if (!this.firstConnectionNotified) {
                    this.notiService.emit({
                        text: 'Conexión establecida con el servidor',
                        type: 'success',
                    });
                    this.firstConnectionNotified = true;
                }
            }),
            map((response) => response.data),
        );
    }

    getCarById(id: string): Observable<Car> {
        return this.http.get<Response<Car>>(`${this.API}/${id}`).pipe(map((response) => response.data));
    }
}
