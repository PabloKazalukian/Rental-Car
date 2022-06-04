import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { request } from '../core/models/request.interface';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  private readonly API= `${environment.api}/request`;

  constructor(private readonly http:HttpClient) { }

  // getAllCars():Observable<Car[]>{
  //   return this.http.get<Car[]>(this.API)
  // }
  getRequestById(id:string):Observable<request[]>{
    return this.http.get<request[]>(`${this.API}/allOfCarId/${id}`)
  }
}
