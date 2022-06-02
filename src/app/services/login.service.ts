import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  BehaviorSubject, map, Observable, throwError } from 'rxjs';
import { Car } from '../core/models/car.interface';
import { Login,LoginResponde } from '../core/models/login.interface';
import { catchError } from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt'

const helper= new JwtHelperService;

interface usuario{
  username:string,
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loggetIn= new BehaviorSubject<boolean>(false)

  private readonly API= `${environment.api}/auth/login`;
  token?:string;

  constructor(private readonly http:HttpClient) {
    this.checkToken();

  }
  private get isLogged():Observable<boolean>{
    return this.loggetIn.asObservable();
  }

  checkLogin(form:Login):Observable<boolean | void>{
    return this.http.post<LoginResponde>(this.API,form)
    .pipe(
      map( (res:LoginResponde)=>{
          this.saveToken(res.token);
          this.loggetIn.next(true);
          if(res) return true
          else return false
        }
      ),
      catchError((err)=>{ return this.handleError(err) })
    );
  }

  isLoggin():Observable<boolean>{
    return this.loggetIn.asObservable();
  }

  logout():void{
    localStorage.removeItem('auth')
    this.loggetIn.next(false);
  }

  private handleError(err:any):Observable<never>{
    let errorMessage='ocurrio un error'
    if(err){
      errorMessage = `error code : ${err.message}`
    }
    return err
  }
  private checkToken():void{

    const userToken = localStorage.getItem('auth');
    if(userToken !== null){
      const isExpired = helper.isTokenExpired(userToken);
      !isExpired ? this.loggetIn.next(true) : this.logout()

    }
    //set userIsLogged = isExpired

  }

  readToken ():usuario {
    const userToken = localStorage.getItem('auth');
    if(userToken !== null){

      return helper.decodeToken(userToken)
    }
    else return {username:'null'}


  }
  private saveToken (token:string):void{
    localStorage.setItem('auth',token);
    this.loggetIn.next(true);
  }
}
