import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { AuthenticatedUser, Login, LoginResponde } from '../../models/login.interface';
import { CredentialsService } from './credential.service';
import { AuthService } from './auth.service';


declare global {
    interface Window {
        google?: any;
    }
}

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    // private loggetIn = new BehaviorSubject<boolean>(false);
    private user$ = new BehaviorSubject<AuthenticatedUser>({ username: '', sub: '', role: '' });
    public _user$ = this.user$.asObservable();

    private readonly API = `${environment.api}/auth`;
    token?: string;

    constructor(private readonly http: HttpClient, private authSvc: AuthService) { }

    login(form: Login): Observable<boolean | void> {
        return this.http.post<LoginResponde>(`${this.API}/login`, form, { withCredentials: true }).pipe(
            map((res: LoginResponde) => {

                this.authSvc.saveToken(res.accessToken);
                this.authSvc.setLoggedInState(true);
                return true;
            }),
            catchError(error => {
                console.log('tp', typeof error)
                this.authSvc.clearSession()
                console.error('Token inválido o expirado:', error);
                return throwError(() => new Error('Token inválido o expirado'));
            })
        );
    }

    logout(): Observable<void> {
        return this.http.get<void>(`${this.API}/logout`, { withCredentials: true }).pipe(
            tap((res) => this.authSvc.clearSession()),
            map(response => response),
            catchError(error => {
                this.authSvc.clearSession()
                console.error('Token inválido o expirado:', error);
                return throwError(() => new Error('Token inválido o expirado'));
            })
        );
    }
}
