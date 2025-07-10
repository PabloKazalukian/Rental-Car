import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, from, map, Observable, of, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Login, LoginResponde } from '../models/login.interface';
import { credentialsUser, Usuario } from '../models/user.interface';
import { decrypt, encrypt } from '../../shared/utils/encryption.util';

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
    private loggetIn = new BehaviorSubject<boolean>(false);
    private user = new BehaviorSubject<Usuario>({ username: '', sub: '', role: '' });
    private userGoogle = new BehaviorSubject<any>({});  // Replace SocialUser with any, since we're dealing with raw data now.

    private readonly API = `${environment.api}/auth`;
    token?: string;

    constructor(private readonly http: HttpClient) {
        this.checkToken();
        this.test();
    }

    checkLogin(form: Login): Observable<boolean | void> {
        return this.http.post<LoginResponde>(`${this.API}/login`, form, { withCredentials: true }).pipe(
            map((res: LoginResponde) => {
                // Ya no guardamos el token, el backend lo guarda como cookie
                this.saveToken(res.accessToken);
                this.loggetIn.next(true);
                return true;
            })
        );
    }

    test(): Observable<boolean> {
        return this.http.get<string>(`${this.API}/me`, { withCredentials: true }).pipe(
            map(response => {
                if (response && response) {
                    this.saveToken(response);
                    return true;
                }
                return false;
            }),
            catchError(error => {
                console.error('Token inválido o expirado:', error);
                this.logout();
                return of(false);
            })
        );
    }

    isLoggin(): Observable<boolean> {
        return this.loggetIn.asObservable();
    }

    logout(): Observable<void> {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.loggetIn.next(false);
        return this.http.get<void>(`${this.API}/logout`, { withCredentials: true }).pipe(map(response => response));
    }

    private checkToken(): void {
        const userToken = localStorage.getItem('token');
        if (userToken !== null) {
            const isExpired = helper.isTokenExpired(userToken);
            !isExpired ? this.loggetIn.next(true) : this.logout();
        }
    }

    readToken(): Observable<Usuario> {
        const encryptedUser = localStorage.getItem('user');

        if (encryptedUser) {
            const decryptedUser = decrypt(encryptedUser);
            const parsedUser = JSON.parse(decryptedUser);
            this.user.next(parsedUser);
        }

        return this.user.asObservable();
    }

    private saveToken(token: string): void {
        const decoded = helper.decodeToken(token);
        const user: Usuario = {
            username: decoded.username,
            sub: decoded.sub,
            role: decoded.role,
        };

        // Guardar user en localStorage encriptado
        const encryptedUser = encrypt(JSON.stringify(user));
        localStorage.setItem('user', encryptedUser);
        localStorage.setItem('token', token);

        this.user.next(user);
        this.loggetIn.next(true);
    }

    // Nueva implementación para login con Google Identity Services


    getCredentials(): { remember: boolean, username: string | null, password: string | null } {
        const remember = localStorage.getItem('remember') === 'true';
        const usernameEncrypted = localStorage.getItem('username');
        const passwordEncrypted = localStorage.getItem('password');
        return {
            remember,
            username: usernameEncrypted ? decrypt(usernameEncrypted) : null,
            password: passwordEncrypted ? decrypt(passwordEncrypted) : null,
        };
    }

    saveCredentials(credentials: credentialsUser): void {
        localStorage.setItem('remember', credentials.remember ? 'true' : 'false');
        localStorage.setItem('username', encrypt(credentials.username));
        localStorage.setItem('password', encrypt(credentials.password));
    }

    removeCredentials(): void {
        localStorage.setItem('remember', 'false');
        localStorage.removeItem('username');
        localStorage.removeItem('password');
    }
}

