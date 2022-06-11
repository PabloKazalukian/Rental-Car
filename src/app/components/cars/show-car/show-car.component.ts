import { Router } from '@angular/router';
import { Car } from './../../../core/models/car.interface';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {loadCar,orderBrandCar} from '../car.actions';


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
export class ShowCarComponent implements OnInit,OnDestroy  {

  private subscripcions: Subscription[]=[];


  carsTotal!:  appState ;
  cars!: Array<Car>;
  car$!:Observable<Car>;
  loading:boolean=true;

  constructor(private store:Store<{autos: appState}>,private readonly router: Router){}

  ngOnInit(): void {
    this.loading=true;
    this.chargeData();

  }
  goWithCar(id:number):void{
    this.router.navigate(['alquiler'],{queryParams:{id}})
  }
  chargeData ():void{
    this.store.dispatch(loadCar())
    this.store.dispatch(orderBrandCar({asc:true}));
    this.subscripcions.push(
      this.store.select('autos').subscribe((e)=>{
        if(e.car.length !==0 || this.loading === false){
          this.cars= e.car
          this.loading = false;
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscripcions.forEach( sub => sub.unsubscribe());
  }
}
