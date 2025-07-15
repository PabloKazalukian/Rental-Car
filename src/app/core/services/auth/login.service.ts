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
                console.log(res.accessToken)
                this.authSvc.saveToken(res.accessToken);
                this.authSvc.setLoggedInState(true);
                return true;
            })
        );
    }

    logout(): Observable<void> {
        return this.http.get<void>(`${this.API}/logout`, { withCredentials: true }).pipe(
            tap((res) => this.authSvc.clearSession()),
            map(response => response));
    }

    // private checkToken(): void {
    //     const userToken = localStorage.getItem('token');
    //     if (userToken !== null) {
    //         const isExpired = helper.isTokenExpired(userToken);
    //         !isExpired ? this.loggetIn.next(true) : this.logout();
    //     }
    // }

    readToken(): Observable<Usuario> {
        return this.authSvc._user$
    }

    // private saveToken(token: string): void {
    //     const decoded = helper.decodeToken(token);
    //     const user: Usuario = {
    //         username: decoded.username,
    //         sub: decoded.sub,
    //         role: decoded.role,
    //     };

    //     // Guardar user en localStorage encriptado
    //     const encryptedUser = encrypt(JSON.stringify(user));
    //     localStorage.setItem('user', encryptedUser);
    //     localStorage.setItem('token', token);

    //     this.user$.next(user);
    //     this.loggetIn.next(true);
    // }

    // Nueva implementación para login con Google Identity Services

    // getCredentials() {
    //     return this.credentialSvc.getCredentials()
    // }

    // removeCredentials() {
    //     this.credentialSvc.removeCredentials()
    // }
    // saveCredentials(credentials: credentialsUser) {
    //     return this.credentialSvc.saveCredentials(credentials);
    // }

}

