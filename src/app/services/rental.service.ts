import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { request, requestReceived, requestSend } from '../core/models/request.interface';
import { catchError } from 'rxjs/operators';


interface idRequest {
    idRequest: string
}
@Injectable({
    providedIn: 'root'
})
export class RentalService {

    private readonly API = `${environment.api}/request`;

    constructor(private readonly http: HttpClient) { }

    getRequestById(id: string): Observable<request[]> {
        return this.http.get<request[]>(`${this.API}/allOfCarId/${id}`)
    }
    getRequestByUserId(userId: number): Observable<requestReceived[]> {
        return this.http.get<requestReceived[]>(`${this.API}/allOfUserId/${userId}`)
    }
    sendRequest(form: requestSend): Observable<boolean | void> {
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

    cancelRequestByIdRequest(idRequest: number): Observable<boolean | void> {
        // let idRequest= idNumber;
        return this.http.put<idRequest>(`${this.API}/cancel`, { idRequest })
            .pipe(
                map((res: any) => {
                    // this.saveToken(res.token)
                    if (res) return true
                    else return false
                }
                ),
            )
    }
    confirmRequestByIdRequest(idRequest: number): Observable<boolean | void> {
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
        console.log(errorMessage)
        if (err) {
            errorMessage = `error code : ${err.message}`
        }
        return err
    }
}
