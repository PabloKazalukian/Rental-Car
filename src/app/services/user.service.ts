import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,map } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface newPass{
  newPass:string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly API= `${environment.api}/user`;


  constructor(private readonly http:HttpClient) { }

  modifyPass(pass:string,idUser:number):Observable<boolean | void>{
    return this.http.put<newPass>(`${this.API}/modifyPass/${idUser}`,{newPass:pass})
    .pipe(
      map( (res:any)=>{
        // this.saveToken(res.token)
        if(res) return true
        else return false
        }
      )
      // catchError((err)=>{ return this.handleError(err) })
    );
  }

  private handleError(err:any):Observable<never>{
    let errorMessage='ocurrio un error'
    if(err){
      errorMessage = `error code : ${err.message}`
    }
    return err
  }
}
