import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, from, map, Observable, of, tap, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Login, LoginResponde } from '../../models/login.interface';
import { credentialsUser, Usuario } from '../../models/user.interface';
import { decrypt, encrypt } from '../../../shared/utils/encryption.util';
import { CredentialsService } from './credential.service';
import { AuthService } from './auth.service';

const helper = new JwtHelperService();

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
    private user$ = new BehaviorSubject<Usuario>({ username: '', sub: '', role: '' });
    public _user$ = this.user$.asObservable();

    private userGoogle = new BehaviorSubject<any>({});  // Replace SocialUser with any, since we're dealing with raw data now.

    private readonly API = `${environment.api}/auth`;
    token?: string;

    constructor(private readonly http: HttpClient, private credentialSvc: CredentialsService, private authSvc: AuthService) {
        // this.loggetIn.next(this.authSvc._loggenIn$.pipe((res:boolean)=> return res))
        // this.checkCookie();
    }

    login(form: Login): Observable<boolean | void> {
        return this.http.post<LoginResponde>(`${this.API}/login`, form, { withCredentials: true }).pipe(
            map((res: LoginResponde) => {
                // Ya no guardamos el token, el backend lo guarda como cookie
                this.authSvc.saveToken(res.accessToken);
                this.authSvc.setLoggedInState(true);
                return true;
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

    // readToken(): Observable<Usuario> {
    //     return this.authSvc._user$
    // }

}

