import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Car } from '../models/car.interface';
import { Response } from '../models/response.interface';
import { NotificationService } from './notifications/notification.service';
import { ParsedHttpError } from './http/http-error-handler.service';

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
            catchError((err: ParsedHttpError) => {
                console.log(err);
                this.notiService.emit({
                    text: 'No se establecio conexión con el servidor',
                });
                return throwError(() => err);
            }),
        );
    }

    getCarById(id: string): Observable<Car> {
        return this.http.get<Response<Car>>(`${this.API}/${id}`).pipe(map((response) => response.data));
    }
}
