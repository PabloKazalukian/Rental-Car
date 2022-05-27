import { Router } from '@angular/router';
import { Car } from './../../../core/models/car.interface';
import { Component, Input, OnInit } from '@angular/core';
import { Store,select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import * as carSelector from '../car.selector'
import {loadCar,searchCar,orderPriceCar,orderBrandCar,orderYearCar} from '../car.actions';


interface appState{
  loading:boolean,
  cars:Array<Car>
  car:Array<Car>
}

@Component({
  selector: 'app-show-car',
  templateUrl: './show-car.component.html',
  styleUrls:['./show-car.component.css']

})
export class ShowCarComponent implements OnInit  {
  carsTotal!:  appState ;
  cars!: Array<Car>;
  car$!:Observable<Car>;

  constructor(private store:Store<{autos: appState}>,private readonly router: Router){}

  ngOnInit(): void {
    this.car$ = this.store.pipe(select(carSelector.getCars))
    this.chargeData();

  }
  goWithCar(id:number):void{
    this.router.navigate(['alquiler'],{queryParams:{id}})
  }
  chargeData ():void{
    this.store.dispatch(loadCar())
    this.store.dispatch(orderBrandCar({asc:true}));
    this.store.select('autos').subscribe((e)=> this.cars= e.car)
  }
}
