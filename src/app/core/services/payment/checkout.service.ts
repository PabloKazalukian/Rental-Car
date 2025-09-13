import { Injectable } from '@angular/core';
import { NotificationService } from '../notifications/notification.service';
import { BehaviorSubject, catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ParsedHttpError } from '../http/http-error-handler.service';
import { Checkout } from '../../models/checkout.interface';
import { id } from 'date-fns/locale';
import { AuthService } from '../auth/auth.service';
import { Response } from '../../models/response.interface';

@Injectable({ providedIn: 'root' })
export class CheckoutService {
    private key = 'checkout:';

    private readonly API = `${environment.api}/cart`;

    private request$ = new BehaviorSubject<string[]>([]);
    public _request$ = this.request$.asObservable();

    constructor(
        private notiSvc: NotificationService,
        private readonly http: HttpClient,
        private authSvc: AuthService,
    ) {
        this.authSvc._user$.subscribe((user) => {
            if (user) {
                this.request$.next(this.getRequest(user.sub));
            }
        });
    }

    private saveRequest(checkout: Checkout): void {
        console.log('salvando', checkout);
        localStorage.setItem(`${this.key}${checkout.user}`, JSON.stringify(checkout.requests));
        this.request$.next(checkout.requests);
    }

    private getRequest(idUser: string): string[] {
        const data = localStorage.getItem(`${this.key}${idUser}`);
        return data ? JSON.parse(data) : [];
    }

    private filterRequestById(requestId: string, idUser: string): string[] {
        const request: string[] = this.getRequest(idUser);

        return request.filter((r) => r !== requestId);
    }

    private getApiCheckout(idUser: string): Observable<string[]> {
        return this.http.get<Response<Checkout>>(`${this.API}/${idUser}`).pipe(
            tap(({ data }) => {
                console.log('CART EN CHECKOUT SERVICE', data);
                this.saveRequest({ requests: data.requests, user: idUser });
            }),
            map(({ data }) => data.requests),
            catchError((err) => {
                this.notiSvc.emit({ text: 'Error al obtener el carrito', type: 'error' });
                return throwError(() => err);
            }),
        );
    }

    private saveApiCheckout(checkout: Checkout): Observable<Checkout> {
        return this.http.post<Checkout>(this.API, { user: checkout.user, requests: checkout.requests }).pipe(
            tap(() => this.notiSvc.emit({ text: 'Carrito guardado correctamente', type: 'success' })),
            catchError((err) => {
                this.notiSvc.emit({ text: 'Error al guardar el carrito', type: 'error' });
                return throwError(() => err);
            }),
        );
    }

    saveCheckout(requestId: string, idUser: string): boolean | void {
        const requests = this.getRequest(idUser);
        requests.push(requestId);
        this.saveRequest({ user: idUser, requests });
        this.saveApiCheckout({ user: idUser, requests }).subscribe();
        return true;
    }

    getCheckout(idUser: string): Observable<string[]> {
        const cached = this.getRequest(idUser);
        if (cached && cached.length > 0) {
            console.log('cachea');
            return of(cached);
        }
        return this.getApiCheckout(idUser);
    }

    removeCheckout(idUser: string): void {
        localStorage.removeItem(`${this.key}${idUser}`);
        this.request$.next([]);
    }

    removeOneRequestById(requestId: string, idUser: string): void {
        const requestFilter = this.filterRequestById(requestId, idUser);
        if (this.getRequest(idUser) === requestFilter) {
            this.notiSvc.emit({ text: 'Ocurrio un error!', type: 'error' });
        }

        this.saveRequest({ user: idUser, requests: requestFilter });

        this.notiSvc.emit({ text: 'La peticion fue quitada del carrito correctamente!', type: 'success' });
    }
}
