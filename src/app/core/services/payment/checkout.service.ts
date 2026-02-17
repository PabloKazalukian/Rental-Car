import { Injectable } from '@angular/core';
import { NotificationService } from '../notifications/notification.service';
import { BehaviorSubject, catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Checkout } from '../../models/checkout.interface';
import { AuthService } from '../auth/auth.service';
import { Response } from '../../models/response.interface';

@Injectable({ providedIn: 'root' })
export class CheckoutService {
    private key = 'checkout:';

    private readonly API = `${environment.api}/cart`;

    private request$ = new BehaviorSubject<string[]>([]);
    public _request$ = this.request$.asObservable();

    private syncing$ = new BehaviorSubject<boolean>(false);
    public _syncing$ = this.syncing$.asObservable();

    constructor(
        private readonly http: HttpClient,
        private notiSvc: NotificationService,
        private authSvc: AuthService,
    ) {
        this.authSvc._user$.subscribe((user) => {
            if (user && this.getRequest(user.sub).length === 0) {
                this.firstGetRequest(user.sub);
            }
        });
    }

    private saveRequest(checkout: Checkout): void {
        localStorage.setItem(`${this.key}${checkout.user}`, JSON.stringify(checkout.requests));
        this.request$.next(checkout.requests);
    }

    private getRequest(idUser: string): string[] {
        const data = localStorage.getItem(`${this.key}${idUser}`);
        this.request$.next(data ? JSON.parse(data) : []);
        return data ? JSON.parse(data) : [];
    }

    private firstGetRequest(idUser: string): void {
        this.getApiCheckout(idUser).subscribe({
            next: (res) => {
                console.log('me usan');
                this.saveRequest({ user: idUser, requests: res });
                this.request$.next(res);
            },
            error: (err) => {
                console.log(err);
            },
        });
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
        return this.http.put<Checkout>(`${this.API}/${checkout.user}`, { user: checkout.user, requests: checkout.requests }).pipe(
            // tap(() => this.notiSvc.emit({ text: 'Carrito guardado correctamente', type: 'success' })),
            catchError((err) => {
                console.log(err);
                this.notiSvc.emit({ text: 'Error al guardar el carrito', type: 'error' });
                return throwError(() => err);
            }),
        );
    }

    saveCheckout(requestId: string, idUser: string): boolean | void {
        const requests = this.getRequest(idUser);
        requests.push(requestId);
        this.saveRequest({ user: idUser, requests });
        console.log(requests);
        this.saveApiCheckout({ user: idUser, requests }).subscribe({
            next: (res) => {
                this.notiSvc.emit({ text: 'La peticion fue retirada del carrito correctamente!', type: 'success' });
                console.log('guardado en api', res);
            },
            error: (err) => {
                console.log(err);
            },
        });
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

    syncApiCheckout(idUser: string): Observable<Checkout> {
        this.syncing$.next(true);
        const requests = this.getRequest(idUser);
        if (!requests || requests.length === 0) {
            return of({ user: idUser, requests: [] });
        }
        return this.saveApiCheckout({ user: idUser, requests });
    }

    removeCheckout(idUser: string): void {
        localStorage.removeItem(`${this.key}${idUser}`);
        this.request$.next([]);
    }

    removeOneRequestById(requestId: string, idUser: string): Observable<Checkout> | void {
        const requestFilter = this.filterRequestById(requestId, idUser);
        if (this.getRequest(idUser) === requestFilter) {
            this.notiSvc.emit({ text: 'Ocurrio un error!', type: 'error' });
        }

        this.saveRequest({ user: idUser, requests: requestFilter });
        this.notiSvc.emit({ text: 'La peticion fue quitada del carrito correctamente!', type: 'success' });
        return this.saveApiCheckout({ user: idUser, requests: requestFilter });
    }
}
