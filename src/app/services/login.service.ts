import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, throwError } from 'rxjs';
import { Car } from '../core/models/car.interface';
import { catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Login, LoginResponde } from '../core/models/login.interface';
import { credentialsUser, usuario } from '../core/models/user.interface';

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

    checkLogin(form: Login): Observable<boolean | void> {
        return this.http.post<LoginResponde>(this.API, form).pipe(
            map((res: LoginResponde) => {
                this.saveToken(res.accessToken);
                this.loggetIn.next(true);
                if (res) return true;
                else return false;
            })
        );
    }

    isLoggin(): Observable<boolean> {
        return this.loggetIn.asObservable();
    }

    logout(): void {
        localStorage.removeItem('auth');
        this.loggetIn.next(false);
    }

    private checkToken(): void {
        const userToken = localStorage.getItem('auth');
        if (userToken !== null) {
            const isExpired = helper.isTokenExpired(userToken);
            !isExpired ? this.loggetIn.next(true) : this.logout();
        }
        //set userIsLogged = isExpired
    }

    readToken(): Observable<usuario> {
        const userToken = localStorage.getItem('auth');
        // console.log(userToken);
        if (userToken) {
            const user = helper.decodeToken(userToken);
            this.user.next(user);
        }
        return this.user.asObservable();
    }

    private saveToken(token: string): void {
        localStorage.setItem('auth', token);
        const userToken = localStorage.getItem('auth');
        // console.log(JwtHelperService);
        if (userToken !== null) {
            const user = helper.decodeToken(userToken);

            this.user.next(user);
        }
        this.loggetIn.next(true);
    }

    getToken(): string | null {
        const userToken = localStorage.getItem('auth');

        return userToken;
    }

    getCredentials(): { remember: boolean, username: string | null, password: string | null } {
        const remember = (localStorage.getItem('remember')) === 'true' ? true : false;
        const username = localStorage.getItem('username');
        const password = localStorage.getItem('password');
        return { remember, username, password };
    }

    saveCredentials(credentials: credentialsUser): void {
        localStorage.setItem('remember', credentials.remember ? 'true' : 'false');
        localStorage.setItem('username', credentials.username);
        localStorage.setItem('password', credentials.password);
    }

    removeCredentials(): void {
        localStorage.setItem('remember', 'false');
        localStorage.setItem('username', '');
        localStorage.setItem('password', '');
    }
}
