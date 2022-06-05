import {Component, Injectable,Input, OnInit, Output,AfterViewInit,ViewChild} from '@angular/core';

import {DateAdapter} from '@angular/material/core';
import {FormGroup, FormControl,Validators} from '@angular/forms';
import { RentalService } from 'src/app/services/rental.service';
import { request } from 'src/app/core/models/request.interface';
import { MatDatepicker } from "@angular/material/datepicker";
import { MatDateRangePicker } from '@angular/material/datepicker';
import { delay, tap, take } from "rxjs/operators";

interface requsitio {initial_date:string,final_date:string}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit,AfterViewInit   {

  @ViewChild(MatDateRangePicker) datepicker!: MatDateRangePicker<Date>;

  @Input() range = new FormGroup({
    start: new FormControl(null,[Validators.required]),
    end: new FormControl(null,[Validators.required]),
  });
  @Input() id!:string;

  arrRequest!:request[]
  other!: requsitio[];
  forbidden: number[] = [];


  datejs:Date = new Date();
  jsFinalDate = `${this.datejs.getDate()}-${this.datejs.getMonth() + 1}-${this.datejs.getFullYear()}`;

  constructor(private rentalSvc: RentalService) {}
  ngAfterViewInit() {
    this.resubscribe();
  }

  resubscribe() {
    this.datepicker.openedStream
      .pipe(
        // tap(() => {
        //   this.datepicker.close();
        //   this.datepicker.disabled = true;
        // }),
        take(1),
        delay(2)
      )
      .subscribe(() => {
        this.isDateHigher
        this.arrRequest
        this.datepicker.disabled = false;
        this.datepicker.open();
        this.resubscribe();
      });
  }

  randomInteger(): number { return Math.floor(Math.random() * 30) % 6; }

  ngOnInit(): void {
    this.rentalSvc.getRequestById(this.id).subscribe(res=>{
      this.arrRequest=res
    });
  }

  myFilter = (date: Date ): boolean => {
    let output = String(date.getDate()).padStart(2, '0') + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + date.getFullYear();
    const datejs:Date = new Date();
    const jsFinalDate = `${datejs.getDate()}-${datejs.getMonth() + 1}-${datejs.getFullYear()}`;
    return (this.isDateHigher(output,true,jsFinalDate,false)) &&
    (this.arrRequest.filter(res=> this.isDateHigher(output,true, res.initial_date,true)&& this.isDateHigher(output,false, res.final_date,true)).length <1)
  };

  getRequest():request[]| undefined{
    let arrRequest!:request[];
    this.rentalSvc.getRequestById('2').subscribe(res=>{
      arrRequest=res
    });
    return arrRequest;
  }
  isDateHigher=(finalDate:string,bigger:boolean,jsFinalDate:string,includ:boolean):boolean=>{


    if (finalDate !== undefined) {
      const fdD = parseInt( finalDate[0] + finalDate[1],10);
      const fdM = parseInt( finalDate[3] + (finalDate[4] !== "-" ? finalDate[4] : ""),10);
      const fdA = parseInt( finalDate[finalDate.length - 4] + finalDate[finalDate.length - 3] + finalDate[finalDate.length - 2] + finalDate[finalDate.length - 1],10);

      const arr = jsFinalDate.split('-');
      const jsfdD = parseInt(arr[0],10);
      const jsfdM = parseInt(arr[1],10);
      const jsfdA = parseInt(arr[2],10);
      if (fdA > jsfdA) {//2021 2022
        return  bigger?true:false
      }
      if (fdM > jsfdM && fdA === jsfdA) {//02-2022  < 03-2022
        return  bigger?true:false
      }
      if ( fdD > jsfdD && fdM === jsfdM && fdA === jsfdA) {//21-01-2022 > 18-02-2022
        return  bigger?true:false
      }
      if(fdD === jsfdD && fdM === jsfdM && fdA === jsfdA){
        return  includ?true:false
      }
        return  bigger?false:true

    }else{
      return  bigger?false:true

    }
  }
}
