import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/core/models/car.interface';
import { LoginService } from 'src/app/services/login.service';
import {FormGroup, FormControl} from '@angular/forms';
import {DateAdapter} from '@angular/material/core';
import { request } from 'src/app/core/models/request.interface';


@Component({
  selector: 'app-alquiler',
  templateUrl: './alquiler.component.html',
  styleUrls: ['./alquiler.component.css']
})
export class AlquilerComponent implements OnInit, OnDestroy {

  private subscripcions: Subscription[]=[];

  id!:string;
  idUser?:number ;
  cars!:Car
  autos!:Car[]

  constructor(private readonly route:ActivatedRoute,private readonly carSvc:CarService, private userSvc:LoginService) { }

  ngOnInit(): void {

    this.subscripcions.push(
      this.route.queryParams.subscribe(
        (params)=> this.id = params['id']
      )
    )
    this.subscripcions.push(
      this.userSvc.readToken().subscribe(res =>{
        this.idUser = res.userId;
      })
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
