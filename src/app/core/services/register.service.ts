import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userRegister } from '../models/user.interface';
import { map, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    private readonly API = `${environment.api}/user`;

    constructor(private readonly http: HttpClient) { }

    registerUser(form: userRegister): Observable<boolean | void> {
        return this.http.post<userRegister>(this.API, form)
            .pipe(
                map((res: userRegister) => {
                    // this.saveToken(res.token)
                    if (res) return true
                    else return false
                }
                )
            );
    }

    verifyEmail(email: string): Observable<any> {
        return this.http.post<any>(`${this.API}/verifyEmail`, { email })
    }

    verifyUsername(username: string): Observable<any> {
        return this.http.post<any>(`${this.API}/verifyUsername`, { username })
    }

    private handleError(err: any): Observable<never> {
        let errorMessage = 'ocurrio un error'
        if (err) {
            errorMessage = `error code : ${err.message}`
        }
        return err
    }
}
