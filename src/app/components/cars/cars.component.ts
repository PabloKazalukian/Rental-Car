import { Car } from 'src/app/core/models/car.interface';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject,Subscription } from 'rxjs';
import { Store,select } from '@ngrx/store';
import {loadCar,searchCar,orderPriceCar,orderBrandCar,orderYearCar} from './car.actions';
import { CarService } from './../../services/car.service';
import * as carSelector from './car.selector'


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

export class CarsComponent implements OnInit,OnDestroy {

  private subscripcions: Subscription[]=[];

  carsTotal!:  appState ;
  cars!: Array<Car>;
  estado!: boolean;
  car$!:Observable<Car>;
  loading$!:boolean | false;
  ascPrice:boolean=false;
  ascBrand:boolean=false;
  ascYear:boolean=false;
  brand!:string ;
  model!:string;
  autos?: any=[];
  carObservable: Subject<any> = new Subject();

  constructor(private store:Store<{autos: appState}>,private readonly carSvc:CarService) {}

  ngOnInit(): void {
    this.estado = false;
    this.subscripcions.push(
      this.carSvc.getAllCars().subscribe(
        car=>{
          this.autos = car
          this.estado = true;
        }
      )
    )
    this.chargeData();

  }

  private chargeData ():void{
    this.store.dispatch(loadCar())
    this.subscripcions.push(
      this.store.select('autos').subscribe((e)=> this.carsTotal= e)
    )
    this.loading$ = this.carsTotal.loading;
    this.cars = this.carsTotal.car;
  }
  public search (text?:text): void{

    this.store.dispatch(searchCar({brand:text?.brand ||'',model:text?.model || ''}))
    this.subscripcions.push(
      this.store.select('autos').subscribe((e)=> this.carsTotal= e)
    )
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
    this.subscripcions.push(
      this.store.select('autos').subscribe((e)=> this.carsTotal= e)
    )
    this.ascBrand=!this.ascBrand;

    this.cars = this.carsTotal.car
  }
  public orderBrand (): void{
    this.ascBrand=!this.ascBrand;
    this.ascPrice=!this.ascPrice;

    this.store.dispatch(orderBrandCar({asc:this.ascBrand}));
    this.subscripcions.push(
      this.store.select('autos').subscribe((e)=> this.carsTotal= e)
    )
    this.cars = this.carsTotal.car
  }
  public orderYear (): void{
    this.ascYear=!this.ascYear;
    this.ascPrice=!this.ascPrice;

    this.store.dispatch(orderYearCar({asc:this.ascYear}));
    this.subscripcions.push(
      this.store.select('autos').subscribe((e)=> this.carsTotal= e)
    )
    this.cars = this.carsTotal.car
  }


  ngOnDestroy(): void {
    this.subscripcions.forEach( sub => sub.unsubscribe());
  }
}
