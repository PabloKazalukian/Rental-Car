import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User, Usuario } from '../models/user.interface';
import { Response } from '../models/response.interface';
import { HttpErrorHandlerService, ParsedHttpError } from './http-error-handler.service';

interface newPass {
    newPass: string;
}

interface newUser {
    username: string;
    email: string;
}

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private readonly API = `${environment.api}/user`;

    constructor(private errorHandler: HttpErrorHandlerService, private readonly http: HttpClient) { }

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
            })
        );
    }

    modifyUser(user: newUser, idUser: string): Observable<boolean | void> {
        return this.http.put<newUser>(`${this.API}/${idUser}`, { username: user.username, email: user.email }).pipe(
            map((res: any) => {
                // this.saveToken(res.token)
                console.log('enteoria', res);
                if (res) return true;
                else return false;
            }),
        );
    };

    findUSerById(idUser: string): Observable<User> {
        return this.http.get<Response<User>>(`${this.API}/${idUser}`).pipe(
            map((res: Response<User>): User => {
                return res.data
            }),
            catchError((err) => {
                console.log(err)
                return throwError(() => err);
            })
        )
    }
}
