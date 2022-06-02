import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

interface usuario{
  username:string,
}

@Component({
  selector: 'app-navbar',
  templateUrl:'./navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavBarComponent implements OnInit {
  islogged:boolean = true
  token!:usuario ;
  usuario!:usuario | undefined;

  constructor(private loginSvc:LoginService) {
    this.loginSvc.isLoggin().subscribe(res=>  this.islogged= res)

   }

  ngOnInit(): void {
    this.accesstoken()
    this.token = this.loginSvc.readToken();
    if(this.token.username !== 'null' ){
      this.usuario = this.token;
    }
    console.log(this.usuario)
  }
  accesstoken():void{
    this.usuario = this.loginSvc.readToken();
    console.log(this.token)
  }

  logout():void{
    this.loginSvc.logout()
    this.accesstoken()
  }



}
