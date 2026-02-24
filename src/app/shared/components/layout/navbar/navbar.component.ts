import { Component, DestroyRef, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from 'src/app/core/services/auth/login.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { AuthenticatedUser } from 'src/app/core/models/login.interface';
import { BtnComponent } from '../../ui/btn/btn.component';
import { CartIconComponent } from '../../ui/icon/cart-icon/cart-icon.component';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    standalone: true,
    imports: [RouterLink, BtnComponent, CartIconComponent],
})
export class NavBarComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];

    private destroyRef = inject(DestroyRef);

    private loginSvc = inject(LoginService);
    private authSvc = inject(AuthService);
    private router = inject(Router);

    islogged = signal<boolean>(false);
    token: AuthenticatedUser = { username: '', sub: '', role: '' };
    user$ = this.authSvc._user$;
    usuario!: AuthenticatedUser | { username: ''; sub: ''; role: '' };
    menuOpen: boolean = false;

    ngOnInit(): void {
        this.accesstoken();
    }

    toggleMenu(): void {
        this.menuOpen = !this.menuOpen;
    }

    accesstoken(): void {
        this.subscriptions.push(
            this.user$.subscribe((res) => {
                this.usuario = res;
            }),
            this.authSvc._loggenIn$.subscribe((res) => this.islogged.set(res)),
        );
    }

    logout(): void {
        this.closeMenu();
        this.subscriptions.push(
            this.loginSvc.logout().subscribe({
                next: (res: any) => {
                    // this.islogged = false;
                    this.router.navigate(['/home']);
                },
                error: (res: any) => {
                    this.router.navigate(['/home']);
                },
            }),
        );
        this.usuario = { username: '', sub: '', role: '' };
    }

    closeMenu(): void {
        this.menuOpen = false;
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }
}
