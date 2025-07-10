import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Email } from '../models/email.interface';
@Injectable({
    providedIn: 'root'
})
export class EmailService {


    private readonly API = `${environment.api}/email`;


    constructor(private readonly http: HttpClient) { }

    sendEmail(form: Email): Observable<boolean | void> {

        return this.http.post<Email>(this.API, form)
            .pipe(
                map((res: Email) => {
                    if (res) return true
                    else return false
                }
                )
            );
    }

}
