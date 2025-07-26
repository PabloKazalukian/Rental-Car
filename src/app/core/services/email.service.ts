import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ContactMessage } from '../models/email.interface';
@Injectable({
    providedIn: 'root'
})
export class EmailService {


    private readonly API = `${environment.api}/email`;


    constructor(private readonly http: HttpClient) { }

    sendEmail(form: ContactMessage): Observable<boolean | void> {

        return this.http.post<ContactMessage>(this.API, form)
            .pipe(
                map((res: ContactMessage) => {
                    if (res) return true
                    else return false
                }
                )
            );
    }

}
