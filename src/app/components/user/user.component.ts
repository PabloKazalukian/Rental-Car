import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { request } from 'src/app/core/models/request.interface';
import { usuario } from 'src/app/core/models/user.interface';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit,OnDestroy {

  private subscripcions: Subscription[]=[];
  user!:usuario

  constructor(private authSvc:LoginService) { }

  ngOnInit(): void {
    this.subscripcions.push(
      this.authSvc.readToken().subscribe(res=> this.user = res)
    )


  }
  ngOnDestroy(): void {
    this.subscripcions.forEach((e)=> e.unsubscribe())
  }

}
