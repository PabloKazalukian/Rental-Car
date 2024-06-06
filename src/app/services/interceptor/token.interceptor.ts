import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { LoginService } from '../login.service'
import { RentalService } from '../rental.service';



@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private authSvc: LoginService, private rentalSvc: RentalService) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const token = this.authSvc.getToken();
        // this.authSvc.readToken().subscribe(res=> console.log(res))
        if (token) {
            request = request.clone({
                setHeaders: {
                    // 'Content-Type': 'application/json; charset=utf-8',
                    'Auth': `${token}`,
                },
            });
        }
        return next.handle(request)
            .pipe(
                catchError((err) => {
                    if (err.status === 401) {
                        this.authSvc.logout();
                    }
                    const error = err.error.message || err.statusText;
                    return throwError(error);
                })
            );

    }
}
