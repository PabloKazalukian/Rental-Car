import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  BehaviorSubject, map, Observable, throwError } from 'rxjs';
import { Car } from '../core/models/car.interface';
import { catchError } from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt'
import { Login,LoginResponde } from '../core/models/login.interface';
import { usuario } from '../core/models/user.interface';

const helper= new JwtHelperService;



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loggetIn= new BehaviorSubject<boolean>(false)
  private user = new BehaviorSubject<usuario>({username:'',userId:0})

  private readonly API= `${environment.api}/auth/login`;
  token?:string;

  constructor(private readonly http:HttpClient) {
    this.checkToken();
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
      )
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

  readToken ():Observable<usuario> {
    const userToken = localStorage.getItem('auth');
    if(userToken){
      this.user.next(helper.decodeToken(userToken))
    }
    return this.user.asObservable()
  }

  private saveToken (token:string):void{
    localStorage.setItem('auth',token);
    const userToken = localStorage.getItem('auth');
    if(userToken !== null){
      this.user.next(helper.decodeToken(userToken))
    }
    this.loggetIn.next(true);
  }

  getToken():string | null{
    const userToken = localStorage.getItem('auth');

    return userToken;
  }
}
