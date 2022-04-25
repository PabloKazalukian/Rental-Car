import { Car } from 'src/app/core/models/car.interface';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store,select } from '@ngrx/store';
import {loadCar,searchCar,orderPriceCar,orderBrandCar,orderYearCar} from './car.actions';

interface appState{
  loading:boolean,
  cars:Array<Car>
  car:Array<Car>
}

interface text{
  model:string | '',
  brand:string |''
}

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})

export class CarsComponent implements OnInit {
  carsTotal!:  appState ;
  cars!: Array<Car>;
  estado!: object;
  car$!:Observable<appState>;
  loading$!:boolean | false;
  ascPrice:boolean=false;
  ascBrand:boolean=false;
  ascYear:boolean=false;
  brand!:string ;
  model!:string;

  constructor(private store:Store<{autos: appState}>) {
   }

  ngOnInit(): void {
    this.store.dispatch(loadCar())
    this.store.dispatch(orderBrandCar({asc:true}));
    this.store.select('autos').subscribe((e)=> this.carsTotal= e)
    this.loading$ = this.carsTotal.loading;
    this.cars = this.carsTotal.car;
  }
  public search (text?:text): void{

    this.store.dispatch(searchCar({brand:text?.brand ||'',model:text?.model || ''}))
    this.store.select('autos').subscribe((e)=> this.carsTotal= e)
    this.cars = this.carsTotal.car;
  }

  public order (order:string):void{
    switch(order){
      case 'price':
        this.orderPrice();
      break;
      case 'brand':
        this.orderBrand();
      break;
      case'year':
        this.orderYear();
      break;
      default:
    }
  }
  public orderPrice (): void{
    this.ascPrice=!this.ascPrice;
    this.store.dispatch(orderPriceCar({asc:this.ascPrice}));
    this.store.select('autos').subscribe((e)=> this.carsTotal= e)
    this.ascBrand=!this.ascBrand;

    this.cars = this.carsTotal.car
  }
  public orderBrand (): void{
    this.ascBrand=!this.ascBrand;
    this.ascPrice=!this.ascPrice;

    this.store.dispatch(orderBrandCar({asc:this.ascBrand}));
    this.store.select('autos').subscribe((e)=> this.carsTotal= e)
    this.cars = this.carsTotal.car
  }
  public orderYear (): void{
    this.ascYear=!this.ascYear;
    this.ascPrice=!this.ascPrice;

    this.store.dispatch(orderYearCar({asc:this.ascYear}));
    this.store.select('autos').subscribe((e)=> this.carsTotal= e)
    this.cars = this.carsTotal.car
  }
}
