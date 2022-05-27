import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Car } from '../core/models/car.interface';
import { Login,LoginResponde } from '../core/models/login.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly API= `${environment.api}/auth/login`;
  token?:string;

  constructor(private readonly http:HttpClient) { }

  checkLogin(form:Login):Observable<LoginResponde | void>{
    return this.http.post<LoginResponde>(this.API,form)
    .pipe(
      map( (res:LoginResponde)=>{
        console.log('respuesta',res)
        this.saveToken(res.token)
        }
      ),
      catchError((err)=> this.handleError(err) )
    );
  }
  private handleError(err:any):Observable<never>{
    let errorMessage='ocurrio un error'
    if(err){
      errorMessage = `error code : ${err.message}`
    }
    window.alert(errorMessage)
    return throwError(errorMessage)
  }

  private saveToken (token:string):void{
    localStorage.setItem('auth',token)
  }
}
