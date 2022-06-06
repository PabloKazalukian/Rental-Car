import {Component, Injectable,Input, OnInit, Output,AfterViewInit,ViewChild} from '@angular/core';

import {DateAdapter} from '@angular/material/core';
import {FormGroup,FormBuilder, FormControl,Validators} from '@angular/forms';
import { RentalService } from 'src/app/services/rental.service';
import { request } from 'src/app/core/models/request.interface';
import { MatDatepicker } from "@angular/material/datepicker";
import { MatDateRangePicker } from '@angular/material/datepicker';
import { delay, tap, take } from "rxjs/operators";
import { ownValidation,isDateHigher } from './app.validator';

interface requsitio {initial_date:string,final_date:string}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit,AfterViewInit   {

  @ViewChild(MatDateRangePicker) datepicker!: MatDateRangePicker<Date>;

  @Input() range!:FormGroup
  @Input() id!:string;

  arrRequest!:request[]
  other!: requsitio[];
  forbidden: number[] = [];



  constructor(private readonly fb: FormBuilder,private rentalSvc: RentalService) {}
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
        isDateHigher
        this.arrRequest
        this.datepicker.disabled = false;
        this.datepicker.open();
        this.resubscribe();
      });
  }

  // randomInteger(): number { return Math.floor(Math.random() * 30) % 6; }

  ngOnInit(): void {
    this.rentalSvc.getRequestById(this.id).subscribe(res=>{
      this.arrRequest=res;
    });
  }


  myFilter = (date: Date ): boolean => {
    let output = String(date.getDate()).padStart(2, '0') + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + date.getFullYear();
    const datejs:Date = new Date();
    const jsFinalDate = `${datejs.getDate()}-${datejs.getMonth() + 1}-${datejs.getFullYear()}`;
    return (isDateHigher(output,true,jsFinalDate,false)) &&
    (this.arrRequest.filter(res=> isDateHigher(output,true, res.initial_date,true)&& isDateHigher(output,false, res.final_date,true)).length <1)
  };


}
