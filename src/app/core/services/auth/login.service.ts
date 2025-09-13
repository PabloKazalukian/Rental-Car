import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Login, LoginResponde } from '../../models/login.interface';
import { AuthService } from './auth.service';
import { SocketService } from '../socket.service';
import { NotificationService } from '../notifications/notification.service';

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

    private readonly API = `${environment.api}/auth`;
    token?: string;

    constructor(
        private readonly http: HttpClient,
        private authSvc: AuthService,
        private socketIo: SocketService,
        private notiSvc: NotificationService,
    ) {}

    login(form: Login): Observable<boolean | void> {
        return this.http.post<LoginResponde>(`${this.API}/login`, form, { withCredentials: true }).pipe(
            map((res: LoginResponde) => {
                this.socketIo.listenMessage((msg: string) => {
                    console.log(msg);
                });
                this.authSvc.saveToken(res.accessToken);
                this.authSvc.setLoggedInState(true);
                this.notiSvc.emit({ text: 'Se loggeo correctamente!', type: 'success' });
                return true;
            }),
            catchError((error) => {
                console.log('error', typeof error);
                this.authSvc.clearSession();
                console.error('Token inválido o expirado:', error);
                return throwError(() => new Error('Token inválido o expirado'));
            }),
        );
    }

    logout(): Observable<void> {
        return this.http.get<void>(`${this.API}/logout`, { withCredentials: true }).pipe(
            tap((res) => this.authSvc.clearSession()),
            map((response) => {
                response;
                this.notiSvc.emit({ text: 'Cerro sesion correctamente!', type: 'success' });
            }),
            catchError((error) => {
                this.authSvc.clearSession();
                console.error('Token inválido o expirado:', error);
                return throwError(() => new Error('Token inválido o expirado'));
            }),
        );
    }
}
