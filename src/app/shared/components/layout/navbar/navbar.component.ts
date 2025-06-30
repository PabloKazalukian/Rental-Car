import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';
import { Subscription } from 'rxjs';
import { usuario } from 'src/app/core/models/user.interface';



@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {

    private subscriptions: Subscription[] = [];

    islogged: boolean = true;
    token: usuario = { username: '', sub: '', role: '' };
    usuario!: usuario | { username: '', sub: '', role: '' };

    constructor(private loginSvc: LoginService) {
        this.subscriptions.push(
            this.loginSvc.isLoggin().subscribe(res => this.islogged = res)
        )
    }

    ngOnInit(): void {
        this.accesstoken()
        // this.subscriptions.push(
        //     this.loginSvc.test().subscribe({
        //         next: (res: any) => {
        //             console.log(res);

        //         },
        //         error: (res: any) => {
        //             console.log(res);
        //         }
        //     })
        // )
    }

    accesstoken(): void {
        this.subscriptions.push(
            this.loginSvc.readToken().subscribe(res => this.usuario = res)
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
            }

            )
        );

        this.usuario = { username: '', sub: '', role: '' }
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

}
