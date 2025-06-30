import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { LoginService } from '../services/login.service'
import { RentalService } from '../services/rental.service';



@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private authSvc: LoginService, private rentalSvc: RentalService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            withCredentials: true, // ⚠️ Esto es clave para enviar cookies
        });

        return next.handle(request).pipe(
            catchError((err) => {
                if (err.status === 401) {
                    this.authSvc.logout();
                }
                return throwError(err.error.message || err.statusText);
            })
        );
    }
}
