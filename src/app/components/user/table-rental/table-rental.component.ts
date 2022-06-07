import { Component, Input, OnInit } from '@angular/core';
import { request } from 'src/app/core/models/request.interface';
import { isDateHigher } from '../../alquiler/form-reactivo/calendar/app.validator';

@Component({
  selector: 'app-table-rental',
  templateUrl: './table-rental.component.html',
  styleUrls: ['./table-rental.component.css']
})
export class TableRentalComponent implements OnInit {

  @Input() request!:request[]
  show!:boolean
  constructor() { }

  ngOnInit(): void {
    this.show=true;
    setTimeout(()=> {
      this.dataSource = this.request;
      this.show=false;
    },1700)
  }

  displayedColumns: string[] = ['initial_date', 'final_date','brand','model','amount'];
  dataSource = this.request;
}
