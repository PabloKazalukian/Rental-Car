import {Component, Injectable, OnInit} from '@angular/core';
import {DateAdapter} from '@angular/material/core';
import {FormGroup, FormControl} from '@angular/forms';
import { RentalService } from 'src/app/services/rental.service';
import { request } from 'src/app/core/models/request.interface';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit   {

  range = new FormGroup({
    start: new FormControl(null),
    end: new FormControl(null),
  });


  datejs:Date = new Date();
  jsFinalDate = `${this.datejs.getDate()}-${this.datejs.getMonth() + 1}-${this.datejs.getFullYear()}`;

  constructor(private rentalSvc: RentalService) {
  }

  ngOnInit(): void {
    this.rentalSvc.getRequestById('1').subscribe(res=>console.log(res))
  }





  rangeFilter(date: Date): boolean {
    // let date = new Date();
    const isDateHigher=(finalDate:string):boolean=>{

      const datejs:Date = new Date();
      const jsFinalDate = `${datejs.getDate()}-${datejs.getMonth() + 1}-${datejs.getFullYear()}`;
      if (finalDate !== undefined) {
        const fdD = parseInt( finalDate[0] + finalDate[1],10);
        const fdM = parseInt( finalDate[3] + (finalDate[4] !== "-" ? finalDate[4] : ""),10);
        const fdA = parseInt( finalDate[finalDate.length - 4] + finalDate[finalDate.length - 3] + finalDate[finalDate.length - 2] + finalDate[finalDate.length - 1],10);

        const arr = jsFinalDate.split('-');
        const jsfdD = parseInt(arr[0],10);
        const jsfdM = parseInt(arr[1],10);
        const jsfdA = parseInt(arr[2],10);
        if (fdA > jsfdA) {//2021 2022
          return true
        }
        if (fdM > jsfdM && fdA === jsfdA) {//02-2022  < 03-2022
          return true
        }
        if ( fdD >= jsfdD && fdM === jsfdM && fdA === jsfdA) {//21-01-2022 > 18-02-2022
          return true
        }
          return false
      }else{
          return false
      }
    }
    let output = String(date.getDate()).padStart(2, '0') + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + date.getFullYear();
    let result = isDateHigher(output)
    return result
  }
}
