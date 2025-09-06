import { Injectable } from '@angular/core';
import { NotificationService } from '../notifications/notification.service';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CheckoutService {
    private key = 'checkout-Request';

    private request$ = new BehaviorSubject<string[]>(this.getRequest());
    public _request$ = this.request$.asObservable();

    constructor(private notiSvc: NotificationService) {}

    saveRequest(checkout: string[]): void {
        localStorage.setItem(this.key, JSON.stringify(checkout));
    }

    saveRental(checkout: string): Observable<boolean | void> {
        const arr: string[] = this.getRequest();
        arr.push(checkout);

        this.saveRequest(arr);
        this.request$.next(arr);
        this.notiSvc.emit({ text: 'Agregado al carrito correctamente!', type: 'success' });
        return of(true);
    }

    getRequest(): string[] {
        const data = localStorage.getItem(this.key);
        return data ? JSON.parse(data) : [];
    }

    removeRequest(requestId: string): void {
        console.log(requestId);
        const requestFilter = this.filterRequestById(requestId);
        if (this.getRequest() === requestFilter) {
            this.notiSvc.emit({ text: 'Ocurrio un error!', type: 'error' });
        }
        localStorage.setItem(this.key, JSON.stringify(requestFilter));
        this.request$.next(requestFilter);
        this.notiSvc.emit({ text: 'La peticion fue quitada del carrito correctamente!', type: 'success' });
    }

    private filterRequestById(requestId: string): string[] {
        const request: string[] = this.getRequest();

        return request.filter((r) => r !== requestId);
    }
}
