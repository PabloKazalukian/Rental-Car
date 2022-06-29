import { Component, OnInit,Inject, OnDestroy  } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
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

  success:boolean=false
  loading:boolean=false
  // complete:boolean=false


  constructor(
    public dialogRef: MatDialogRef<DialogConfirmationComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: requestSend,
    private rentalSvc:RentalService,
    private router:Router

    ) {}

  ngOnInit(): void {
    console.log(this.data);
  }

  request():void{
    this.loading=true;
    this.data.stateReq=false;
    this.subscripcions.push(
      this.rentalSvc.sendRequest(this.data).subscribe({
        next: (res)=>{
          console.log(res);
          this.loading=false;
          this.success = true;
          setTimeout(()=>{
            this.dialogRef.close();
            this.router.navigate(['/usuario'])
          },1000)

        },
        error: (res)=>{
          this.loading=false;
          this.success = false
          alert('error');
        }
      })
    )
  }

  confirm():void{
    this.loading=true;
    this.subscripcions.push(
      this.rentalSvc.sendRequest(this.data).subscribe({
        next: (res)=>{
          this.loading=false;
          this.success = true
          setTimeout(()=>{
            this.dialogRef.close();
            this.router.navigate(['/usuario'])
          },1800)
        },
        error: (res)=>{
          this.loading=false;
          this.success = false
          alert('error');
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscripcions.forEach((e)=> e.unsubscribe())
  }

}
