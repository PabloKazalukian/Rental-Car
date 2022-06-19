import { Component, OnInit,Inject, OnDestroy  } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { requestSend } from 'src/app/core/models/request.interface';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrls: ['./dialog-confirmation.component.css']
})
export class DialogConfirmationComponent implements OnInit,OnDestroy {

  private subscripcions: Subscription[]=[];

  success!:boolean


  constructor(
    public dialogRef: MatDialogRef<DialogConfirmationComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: requestSend,
    private rentalSvc:RentalService
    ) {}

  ngOnInit(): void {
    console.log(this.data);
  }

  request():void{
    this.data.stateReq=false;
    console.log(this.data);
    this.subscripcions.push(
      this.rentalSvc.sendRequest(this.data).subscribe({
        next: (res)=>{
          this.success = true
          // setTimeout( ()=> this.router.navigate(['']),100)
        },
        error: (res)=>{
          this.success = false
        }
      })
    )
  }

  confirm():void{
    this.subscripcions.push(
      this.rentalSvc.sendRequest(this.data).subscribe({
        next: (res)=>{
          this.success = true
          // setTimeout( ()=> this.router.navigate(['']),100)
        },
        error: (res)=>{
          this.success = false
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscripcions.forEach((e)=> e.unsubscribe())
  }

}
