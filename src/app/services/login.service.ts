import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, throwError } from 'rxjs';
import { Car } from '../core/models/car.interface';
import { catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Login, LoginResponde } from '../core/models/login.interface';
import { credentialsUser, usuario } from '../core/models/user.interface';
import { decrypt, encrypt } from '../shared/encryption.util';

const helper = new JwtHelperService();

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    private loggetIn = new BehaviorSubject<boolean>(false);
    private user = new BehaviorSubject<usuario>({ username: '', sub: '', role: "" });

    private readonly API = `${environment.api}/auth/login`;
    token?: string;

    constructor(private readonly http: HttpClient) {
        this.checkToken();
    }

    // checkLogin(form: Login): Observable<boolean | void> {
    //     return this.http.post<LoginResponde>(this.API, form).pipe(
    //         map((res: LoginResponde) => {
    //             this.saveToken(res.accessToken);
    //             this.loggetIn.next(true);
    //             if (res) return true;
    //             else return false;
    //         })
    //     );
    // }

    checkLogin(form: Login): Observable<boolean | void> {
        return this.http.post<LoginResponde>(this.API, form, { withCredentials: true }).pipe(
            map((res: LoginResponde) => {
                // Ya no guardamos el token, el backend lo guarda como cookie
                this.saveToken(res.accessToken);
                this.loggetIn.next(true);
                return true;
            })
        );
    }

    isLoggin(): Observable<boolean> {
        return this.loggetIn.asObservable();
    }

    logout(): void {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');

        this.loggetIn.next(false);
    }

    private checkToken(): void {
        const userToken = sessionStorage.getItem('token');
        if (userToken !== null) {
            const isExpired = helper.isTokenExpired(userToken);
            !isExpired ? this.loggetIn.next(true) : this.logout();
        }
        //set userIsLogged = isExpired
    }

    readToken(): Observable<usuario> {
        const encryptedUser = sessionStorage.getItem('user');

        if (encryptedUser) {
            const decryptedUser = decrypt(encryptedUser);
            const parsedUser = JSON.parse(decryptedUser);
            this.user.next(parsedUser);
        }

        return this.user.asObservable();
    }

    private saveToken(token: string): void {
        const decoded = helper.decodeToken(token);
        const user: usuario = {
            username: decoded.username,
            sub: decoded.sub,
            role: decoded.role,
        };

        // Guardar user en sessionStorage encriptado
        const encryptedUser = encrypt(JSON.stringify(user));
        sessionStorage.setItem('user', encryptedUser);
        sessionStorage.setItem('token', token);

        this.user.next(user);
        this.loggetIn.next(true);
    }

    // getToken(): string | null {
    //     const userToken = sessionStorage.getItem('user');

    //     return userToken;
    // }

    getCredentials(): { remember: boolean, username: string | null, password: string | null } {
        const remember = sessionStorage.getItem('remember') === 'true';
        const usernameEncrypted = sessionStorage.getItem('username');
        const passwordEncrypted = sessionStorage.getItem('password');
        return {
            remember,
            username: usernameEncrypted ? decrypt(usernameEncrypted) : null,
            password: passwordEncrypted ? decrypt(passwordEncrypted) : null,
        };
    }

    saveCredentials(credentials: credentialsUser): void {
        sessionStorage.setItem('remember', credentials.remember ? 'true' : 'false');
        sessionStorage.setItem('username', encrypt(credentials.username));
        sessionStorage.setItem('password', encrypt(credentials.password));
    }

    removeCredentials(): void {
        sessionStorage.setItem('remember', 'false');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('password');
    }

}
