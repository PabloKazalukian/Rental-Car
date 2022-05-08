import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

const cars =['auto1','auto2']

@Injectable({providedIn:'root'})
export class DataResolverService implements Resolve<any>{
    resolve(): Observable<any>{
        //TODO: CALL SERVICE
        return of(cars);
    }
}