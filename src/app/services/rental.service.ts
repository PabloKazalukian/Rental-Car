import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, throwError } from 'rxjs';
import { request, requestReceived, requestSend } from '../core/models/request.interface';
import { catchError } from 'rxjs/operators';
import { Response } from '../core/models/response.interface';


interface idRequest {
    idRequest: string
}
@Injectable({
    providedIn: 'root'
})
export class RentalService {

    private readonly API = `${environment.api}/request`;

    constructor(private readonly http: HttpClient) { }

    getRequestById(idCar: string): Observable<request[]> {
        return this.http.get<Response<request[]>>(`${this.API}/allOfCarId/${idCar}`).pipe(map(response => response.data));
    }
    getRequestByUserId(userId: string): Observable<requestReceived[]> {
        return this.http.get<Response<requestReceived[]>>(`${this.API}/allOfUserId/${userId}`).pipe(map(response => response.data),
            catchError(error => {
                console.error("Error en la petición:", error); // Log del error
                return throwError(() => new Error("Error al obtener las solicitudes. Intente nuevamente.")); // Lanza un error manejado
            }))
    }
    sendRequest(form: requestSend): Observable<boolean | void> {
        // console.log(form)
        console.log(form)
        return this.http.post<requestSend>(this.API, form)
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
    }

    cancelRequestByIdRequest(requestId: string): Observable<boolean | void> {
        // let idRequest= idNumber;
        return this.http.put<idRequest>(`${this.API}/cancel`, { requestId })
            .pipe(
                map((res: any) => {
                    // this.saveToken(res.token)
                    if (res) return true
                    else return false
                }
                ),
            )
    }
    confirmRequestByIdRequest(idRequest: string): Observable<boolean | void> {
        // let idRequest= idNumber;
        return this.http.put<idRequest>(`${this.API}/confirm`, { idRequest })
            .pipe(
                map((res: any) => {
                    // this.saveToken(res.token)
                    if (res) return true
                    else return false
                }
                ),
            )
    }

    private handleError(err: any): Observable<never> {
        let errorMessage = 'ocurrio un error'
        if (err) {
            errorMessage = `error code : ${err.message}`
        }
        console.log(errorMessage)
        return err
    }
}
