import { Injectable } from '@angular/core';
import { NotificationService } from '../notifications/notification.service';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CheckoutService {
    private key = 'checkout-Request';

    constructor(private notiSvc: NotificationService) {}

    saveRequest(checkout: string[]): void {
        localStorage.setItem(this.key, JSON.stringify(checkout));
    }

    saveRental(checkout: string): Observable<boolean | void> {
        const arr: string[] = this.getRequest();
        arr.push(checkout);

        this.saveRequest(arr);
        this.notiSvc.emit({ text: 'Agregado al carrito correctamente!', type: 'success' });
        return of(true);
    }

    // Recupera el array de strings
    getRequest(): string[] {
        const data = localStorage.getItem(this.key);
        return data ? JSON.parse(data) : [];
    }

    // Limpia los Request (ej: al finalizar compra)
    removeRequest(): void {
        localStorage.removeItem(this.key);
    }
}
