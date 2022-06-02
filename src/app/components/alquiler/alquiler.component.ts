import { ThisReceiver } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/core/models/car.interface';

@Component({
  selector: 'app-alquiler',
  templateUrl: './alquiler.component.html',
  styleUrls: ['./alquiler.component.css']
})
export class AlquilerComponent implements OnInit, OnDestroy {
  private subscripcions: Subscription[]=[];

  id!:string;
  cars!:Car
  cars$!:Observable<Car[]>
  autos!:Car[]
  constructor(private readonly route:ActivatedRoute,private readonly carSvc:CarService) { }

  ngOnInit(): void {

    this.subscripcions.push(
      this.route.queryParams.subscribe(
        (params)=> this.id = params['id']
      )
    )

    this.subscripcions.push(
      this.carSvc.getCarById(this.id).subscribe(
        car=> this.cars = car[0]
      )
    )


  }

  ngOnDestroy(): void {
    this.subscripcions.forEach( sub => sub.unsubscribe());
  }
}
