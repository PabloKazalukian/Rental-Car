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
@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})

export class CarsComponent implements OnInit {
  cars!: any;
  estado!: object;
  car$!:Observable<appState>;
  loading$!:Observable<any> | false;
  textoDeBrand:any ='';
  textoDeModel:any ='';
  ascPrice:boolean=false;
  ascBrand:boolean=false;
  ascYear:boolean=false;


  constructor(private store:Store<{autos: appState}>) {
   }

  ngOnInit(): void {
    this.store.dispatch(loadCar())
    this.store.dispatch(orderBrandCar({asc:true}));
    this.store.select('autos').subscribe((e)=> this.cars= e)
    this.loading$ = this.cars.loading;
    this.car$ = this.cars.car;
    this.cars = this.cars.car
  }
  public search (e:string,model:string): void{
    this.store.dispatch(searchCar({brand:this.textoDeBrand,model:this.textoDeModel}))
    this.store.select('autos').subscribe((e)=> this.cars= e)
    this.cars = this.cars.car
  }

  public orderPrice (asc:boolean): void{
    this.ascPrice=!this.ascPrice;
    this.store.dispatch(orderPriceCar({asc:this.ascPrice}));
    this.store.select('autos').subscribe((e)=> this.cars= e)
    this.ascBrand=!this.ascBrand;

    this.cars = this.cars.car
  }
  public orderBrand (asc:boolean): void{
    this.ascBrand=!this.ascBrand;
    this.ascPrice=!this.ascPrice;

    this.store.dispatch(orderBrandCar({asc:this.ascBrand}));
    this.store.select('autos').subscribe((e)=> this.cars= e)
    this.cars = this.cars.car
  }
  public orderYear (asc:boolean): void{
    this.ascYear=!this.ascYear;
    this.ascPrice=!this.ascPrice;

    this.store.dispatch(orderYearCar({asc:this.ascYear}));
    this.store.select('autos').subscribe((e)=> this.cars= e)
    this.cars = this.cars.car
  }
}
