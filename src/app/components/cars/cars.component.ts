import { Car } from 'src/app/core/models/car.interface';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store,select } from '@ngrx/store';
import listaCars from 'src/assets/json/db.json';
import {loadCar,searchCar} from './car.actions';
import * as selector from './car.selector'

interface appState{
  loading:boolean,
  cars:Array<Car>
  car:Array<Car>
}
@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})

export class CarsComponent implements OnInit {
  cars!: any;
  estado!: object;
  car$!:Observable<appState>
  loading$!:Observable<any> | false
  textoDeInput:any =null

  constructor(private store:Store<{autos: appState}>) {
   }

  ngOnInit(): void {
    // this.firstWay()
    this.store.dispatch(loadCar())
    this.store.select('autos').subscribe((e)=> this.cars= e)
    this.store.select('autos').subscribe((e)=> console.log(e))
    console.log(this.cars)
    this.loading$ = this.cars.loading;
    this.car$ = this.cars.car;
    console.log(this.loading$)
    console.log(this.car$)
    this.cars = this.cars.car
  }
  public search (e:string): void{
    console.log(this.textoDeInput)
    this.store.dispatch(searchCar({brand:this.textoDeInput}))
    this.store.select('autos').subscribe((e)=> this.cars= e)
    this.cars = this.cars.car
  }
  public firstWay():void{
    const Car:any = listaCars;
    this.cars = Car
    console.log(Car);    
  }

}
