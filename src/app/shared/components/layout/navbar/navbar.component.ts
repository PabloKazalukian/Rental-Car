import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/core/models/user.interface';
import { AuthService } from 'src/app/core/services/auth/auth.service';



@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {

    private subscriptions: Subscription[] = [];

    islogged: boolean = true;
    token: Usuario = { username: '', sub: '', role: '' };
    user$ = this.authSvc._user$;
    usuario!: Usuario | { username: '', sub: '', role: '' };

    constructor(private loginSvc: LoginService, private authSvc: AuthService) {
        this.subscriptions.push(
            this.authSvc._loggenIn$.subscribe(res => this.islogged = res)
        )
    }

    ngOnInit(): void {
        this.accesstoken();
    }

    accesstoken(): void {
        this.subscriptions.push(
            this.user$.subscribe(res => { this.usuario = res; console.log(res) }) //errorqui
        )
    }

    logout(): void {
        this.subscriptions.push(
            this.loginSvc.logout().subscribe({
                next: (res: any) => {
                    console.log(res);
                    this.islogged = false;
                },
                error: (res: any) => {
                    console.log(res);
                }
            })
        );
        this.usuario = { username: '', sub: '', role: '' }
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

}
