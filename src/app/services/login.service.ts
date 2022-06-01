import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  map, Observable, throwError } from 'rxjs';
import { Car } from '../core/models/car.interface';
import { Login,LoginResponde } from '../core/models/login.interface';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly API= `${environment.api}/auth/login`;
  token?:string;

  constructor(private readonly http:HttpClient) { }

  checkLogin(form:Login):Observable<boolean | void>{
    return this.http.post<LoginResponde>(this.API,form)
    .pipe(
      map( (res:LoginResponde)=>{
        this.saveToken(res.token)
        if(res) return true
        else return false
        }
      ),
      catchError((err)=>{ return this.handleError(err) })
    );
  }

  isLoggin():void{

  }


  private handleError(err:any):Observable<never>{
    let errorMessage='ocurrio un error'
    if(err){
      errorMessage = `error code : ${err.message}`
    }
    return err
  }

  private saveToken (token:string):void{
    localStorage.setItem('auth',token)
  }
}