import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Subscription } from 'rxjs';
import { usuario } from '../../core/models/user.interface'



@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {

    private subscripcions: Subscription[] = [];

    islogged: boolean = true;
    token: usuario = { username: '', sub: '', role: '' };
    usuario!: usuario | { username: '', sub: '', role: '' };

    constructor(private loginSvc: LoginService) {
        this.subscripcions.push(
            this.loginSvc.isLoggin().subscribe(res => this.islogged = res)
        )
    }

    ngOnInit(): void {
        this.accesstoken()
    }

    accesstoken(): void {
        this.subscripcions.push(
            this.loginSvc.readToken().subscribe(res => this.usuario = res)
        )
    }

    logout(): void {
        this.loginSvc.logout();
        console.log(this.usuario);
        this.usuario = { username: '', sub: '', role: '' }
    }

    ngOnDestroy(): void {
        this.subscripcions.forEach(sub => sub.unsubscribe());
    }

}
