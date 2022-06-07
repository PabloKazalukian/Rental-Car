import {Component, Input, OnInit, AfterViewInit,ViewChild, OnDestroy} from '@angular/core';

import {FormGroup,FormBuilder} from '@angular/forms';
import { RentalService } from 'src/app/services/rental.service';
import { request } from 'src/app/core/models/request.interface';
import { MatDateRangePicker } from '@angular/material/datepicker';
import { delay, take } from "rxjs/operators";
import { isDateHigher } from './app.validator';
import { Subscription } from 'rxjs';

interface requsitio {initial_date:string,final_date:string}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit,AfterViewInit,OnDestroy   {

  @ViewChild(MatDateRangePicker) datepicker!: MatDateRangePicker<Date>;

  @Input() range!:FormGroup
  @Input() id!:string;

  private subscripcions: Subscription[]=[];

  arrRequest!:request[]
  other!: requsitio[];
  forbidden: number[] = [];



  constructor(private readonly fb: FormBuilder,private rentalSvc: RentalService) {}
  ngAfterViewInit() {
    this.resubscribe();
  }

  resubscribe() {
    this.subscripcions.push(
      this.datepicker.openedStream
        .pipe(
          take(1),
          delay(2)
        )
        .subscribe(() => {
          isDateHigher
          this.arrRequest
          this.datepicker.disabled = false;
          this.datepicker.open();
          this.resubscribe();
        })
    )
  }

  ngOnInit(): void {
    this.subscripcions.push(
      this.rentalSvc.getRequestById(this.id).subscribe(res=>{
        this.arrRequest=res;
      })
    )

  }

  myFilter = (date: Date ): boolean => {
    let output = String(date.getDate()).padStart(2, '0') + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + date.getFullYear();
    const datejs:Date = new Date();
    const jsFinalDate = `${datejs.getDate()}-${datejs.getMonth() + 1}-${datejs.getFullYear()}`;
    return (isDateHigher(output,true,jsFinalDate,false)) &&
    (this.arrRequest.filter(res=> isDateHigher(output,true, res.initial_date,true)&& isDateHigher(output,false, res.final_date,true)).length <1)
  };

  ngOnDestroy(): void {
    this.subscripcions.forEach((e)=> e.unsubscribe())
  }

}
