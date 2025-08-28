import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, throwError } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { ModifyUser, User } from '../models/user.interface';
import { Response } from '../models/response.interface';
import { AuthService } from './auth/auth.service';
import { ParsedHttpError } from './http/http-error-handler.service';

interface newPass {
    newPass: string;
}

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private readonly API = `${environment.api}/user`;

    constructor(
        private authSvc: AuthService,
        private readonly http: HttpClient,
    ) {}

    modifyPass(pass: string, idUser: string): Observable<boolean | void> {
        return this.http.put<newPass>(`${this.API}/modifyPass/${idUser}`, { password: pass }).pipe(
            map((res: any) => {
                // console.log('res,res', res)
                if (res) return true;
                else return false;
            }),
            catchError((err: ParsedHttpError) => {
                console.log(err);
                return throwError(() => err);
            }),
        );
    }

    modifyUser(user: ModifyUser, idUser: string): Observable<boolean | void> {
        console.log(user);
        return this.http
            .put<ModifyUser>(`${this.API}/${idUser}`, {
                username: user.username,
                email: user.email,
            })
            .pipe(
                take(1),
                switchMap((user) => {
                    console.log('que pasa aca', user);
                    return this.authSvc.refreshCookie();
                }),
                map((res) => {
                    res === true;
                }),
            );
    }

    findUSerById(idUser: string): Observable<User> {
        return this.http.get<Response<User>>(`${this.API}/${idUser}`).pipe(
            map((res: Response<User>): User => {
                return res.data;
            }),
            catchError((err) => {
                console.log(err);
                return throwError(() => err);
            }),
        );
    }
}
