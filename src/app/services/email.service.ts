import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { email } from '../core/models/email.interface';
@Injectable({
  providedIn: 'root'
})
export class EmailService {


  private readonly API= `${environment.api}/email/contact`;


  constructor(private readonly http:HttpClient) {}

  sendEmail(form:email):Observable<boolean | void>{

    return this.http.post<email>(this.API,form)
    .pipe(
      map( (res:email)=>{
        if(res) return true
        else return false
        }
      )
    );
  }

}
