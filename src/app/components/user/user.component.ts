import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { request } from 'src/app/core/models/request.interface';
import { usuario } from 'src/app/core/models/user.interface';
import { LoginService } from 'src/app/services/login.service';
import { RentalService } from 'src/app/services/rental.service';
import { delay, tap, take } from "rxjs/operators";
import { TableRentalComponent } from './table-rental/table-rental.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit,OnDestroy {

  user!:string
  private subscripcions: Subscription[]=[];
  usuario!:usuario
  arrRequest!:request[]

  constructor(private authSvc:LoginService,private requestSvc:RentalService) { }

  ngOnInit(): void {
    this.subscripcions.push(
      this.authSvc.readToken().subscribe(res=> this.usuario = res)
    )
    if(this.usuario?.userId){
      this.subscripcions.push(
        this.requestSvc.getRequestByUserId(this.usuario.userId).pipe(
          delay(1000)
        ).subscribe((res)=>{
          this.arrRequest=res;
        })
      )

    }
  }
  ngOnDestroy(): void {
    this.subscripcions.forEach((e)=> e.unsubscribe())
  }

}
