import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { AuthenticatedUser, Login } from '../../models/login.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { decrypt, encrypt } from 'src/app/shared/utils/encryption.util';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private readonly API = `${environment.api}/auth`;

    private loggetIn$ = new BehaviorSubject<boolean>(false);
    public _loggenIn$ = this.loggetIn$.asObservable();

    private user$ = new BehaviorSubject<AuthenticatedUser>({ username: '', sub: '', role: '' });
    public _user$ = this.user$.asObservable();


    constructor(private readonly http: HttpClient) {
        this.init();
    }

    init(): void {
        const token = localStorage.getItem('token');
        if (!token) {
            this.clearSession();
            return;
        }

        const isExpired = helper.isTokenExpired(token);
        if (isExpired) {
            this.clearSession();
            return;
        }

        const decoded = helper.decodeToken(token);
        const user: AuthenticatedUser = {
            username: decoded.username,
            sub: decoded.sub,
            role: decoded.role
        };

        // Guardar estado reactivo
        this.user$.next(user);
        this.loggetIn$.next(true);
    }

    clearSession(): void {
        this.user$.next({ username: '', sub: '', role: '' });
        this.loggetIn$.next(false);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    checkCookie(): Observable<boolean> {
        return this.http.get<string>(`${this.API}/me`, { withCredentials: true }).pipe(
            map((response) => {
                console.log('Response from checkCookie:', response);
                if (response && response) {
                    this.saveToken(response);
                    return true;
                }
                return false;
            }),
            catchError(error => {
                console.error('Token inválido o expirado:', error);
                // this.logout();
                this.loggetIn$.next(false);
                return this._loggenIn$
                // return of(false);
            })
        );
    };

    refreshCookie(): Observable<boolean | void> {
        return this.http.post(`${this.API}/refresh`, null, { withCredentials: true }).pipe(
            map((res: any) => {
                this.saveToken(res.accessToken); // decodea y hace .next(user)
                return true;
            }),
            catchError((err) => {
                return of(false);
            })
        )
    }



    readToken(): Observable<AuthenticatedUser> {
        const encryptedUser = localStorage.getItem('user');

        if (encryptedUser) {
            const decryptedUser = decrypt(encryptedUser);
            const parsedUser = JSON.parse(decryptedUser);
            this.user$.next(parsedUser);
        }
        return this.user$.asObservable();

    }

    saveToken(token: string): void {
        const decoded = helper.decodeToken(token);
        const user: AuthenticatedUser = {
            username: decoded.username,
            sub: decoded.sub,
            role: decoded.role,
        };

        // Guardar user en localStorage encriptado
        const encryptedUser = encrypt(JSON.stringify(user));
        localStorage.setItem('user', encryptedUser);
        localStorage.setItem('token', token);

        this.user$.next(user);
        this.loggetIn$.next(true);
    }

    setLoggedInState(state: boolean): void {
        this.loggetIn$.next(state);
    }

    setUserInState(state: AuthenticatedUser) {
        this.user$.next(state)
    }

}
