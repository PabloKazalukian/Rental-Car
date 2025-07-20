import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, throwError } from 'rxjs';
import { Request, RequestReceived, RequestSend } from '../models/request.interface';
import { catchError } from 'rxjs/operators';
import { Response } from '../models/response.interface';


interface idRequest {
    idRequest: string
}
@Injectable({
    providedIn: 'root'
})
export class RentalService {

    private readonly API = `${environment.api}/request`;

    constructor(private readonly http: HttpClient) { }

    getRequestById(idCar: string): Observable<Request[]> {
        return this.http.get<Response<Request[]>>(`${this.API}/allOfCarId/${idCar}`).pipe(map(response => response.data));
    }
    getRequestByUserId(userId: string): Observable<RequestReceived[]> {
        return this.http.get<Response<RequestReceived[]>>(`${this.API}/allOfUserId/${userId}`).pipe(
            map(response => response.data),
            catchError(error => {
                // console.error("Error en la petición:", error); // Log del error
                return throwError(() => error.message);
            }))
    };

    sendRequest(form: RequestSend): Observable<boolean | void> {
        // console.log(form)
        // console.log(form)
        return this.http.post<RequestSend>(this.API, form)
            .pipe(
                map((res) => {
                    // this.saveToken(res.token)
                    console.log(res)
                    if (res) return true
                    else return false
                }
                ),
                catchError((err) => { return this.handleError(err) })
            );
    };

    cancelRequestByIdRequest(requestId: string): Observable<boolean | void> {

        return this.http.put<idRequest>(`${this.API}/cancel`, { requestId })
            .pipe(
                map((res: any) => {
                    if (res) return true
                    else return false
                }),
            )
    };

    confirmRequestByIdRequest(requestId: string): Observable<boolean | void> {
        // let idRequest= idNumber;
        return this.http.put<idRequest>(`${this.API}/confirm`, { requestId })
            .pipe(
                map((res: any) => {
                    // this.saveToken(res.token)
                    if (res) return true
                    else return false
                }
                ),
            )
    };

    private handleError(err: any): Observable<never> {
        let errorMessage = 'ocurrio un error'
        if (err) {
            errorMessage = `error code : ${err.message}`
        }
        console.log(errorMessage)
        return err
    }
}
