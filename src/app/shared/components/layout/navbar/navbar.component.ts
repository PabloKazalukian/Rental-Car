import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/auth/login.service';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/core/models/user.interface';
import { AuthService } from 'src/app/core/services/auth/auth.service';



@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {

    private subscriptions: Subscription[] = [];

    islogged: boolean = true;
    token: Usuario = { username: '', sub: '', role: '' };
    user$ = this.authSvc._user$;
    usuario!: Usuario | { username: '', sub: '', role: '' };
    menuOpen: boolean = false;


    constructor(private loginSvc: LoginService, private authSvc: AuthService, private router: Router) {
        this.subscriptions.push(
            this.authSvc._loggenIn$.subscribe(res => this.islogged = res)
        )
    }

    ngOnInit(): void {
        this.accesstoken();
    }


    toggleMenu(): void {
        this.menuOpen = !this.menuOpen;
    }


    accesstoken(): void {
        this.subscriptions.push(
            this.user$.subscribe(res => { this.usuario = res; }) //errorqui
        )
    }

    logout(): void {
        this.closeMenu();
        this.subscriptions.push(
            this.loginSvc.logout().subscribe({
                next: (res: any) => {
                    this.islogged = false;
                    this.router.navigate(['/home']);
                },
                error: (res: any) => {
                    this.router.navigate(['/home']);
                }
            })
        );
        this.usuario = { username: '', sub: '', role: '' }
    }

    closeMenu(): void {
        this.menuOpen = false;
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

}
