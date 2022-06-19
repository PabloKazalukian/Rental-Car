import { Component, Input, OnInit } from '@angular/core';
import { request } from 'src/app/core/models/request.interface';
import { Subscription } from 'rxjs';
import { isDateHigher } from '../../alquiler/form-reactivo/calendar/app.validator';
import { RentalService } from 'src/app/services/rental.service';
import { delay, tap, take } from "rxjs/operators";
import { usuario } from 'src/app/core/models/user.interface';

@Component({
  selector: 'app-table-rental',
  templateUrl: './table-rental.component.html',
  styleUrls: ['./table-rental.component.css']
})
export class TableRentalComponent implements OnInit {

  private subscripcions: Subscription[]=[];

  @Input() user!:usuario
  show!:boolean
  request!:request[]

  constructor(private requestSvc:RentalService) { }

  ngOnInit(): void {
    this.show=true;
    this.dataSource = this.request;

    if(this.user?.userId){
      this.subscripcions.push(
        this.requestSvc.getRequestByUserId(this.user.userId).pipe(
          delay(1700)
        ).subscribe((res)=>{
          console.log(res)
          this.request=res;
          this.dataSource = this.request;

          setTimeout(()=> {
            this.show=false;
          },1700)
        })
      )

    }
  }

  displayedColumns: string[] = ['initial_date', 'final_date','brand','model','amount','modify'];
  dataSource = this.request;

  cancelRequest(element:any):void{
    console.log(element)
    element.state = 'cancel'
    this.subscripcions.push(
      this.requestSvc.cancelRequestByIdRequest(element.id_request).subscribe({
        next: (res)=>{
          element.state = 'cancelNow';
        },
        error: (res)=>{
          // this.login=false
        },
      })
    )
  }
  confirmRequest(element:any):void{
    // confirmRequestByIdRequest
    console.log(element)
    element.state = 'cancel'
    this.subscripcions.push(
      this.requestSvc.confirmRequestByIdRequest(element.id_request).subscribe({
        next: (res)=>{
          element.state = 'con';
        },
        error: (res)=>{
          // this.login=false
        },
      })
    )
  }

  ngOnDestroy(): void {
    this.subscripcions.forEach((e)=> e.unsubscribe())
  }
}
