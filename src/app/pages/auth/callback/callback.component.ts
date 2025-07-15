import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { LoginService } from 'src/app/core/services/auth/login.service';

@Component({
    selector: 'app-callback',
    templateUrl: './callback.component.html',
    styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

    success: boolean = false;
    loading: boolean = true;

    constructor(private router: Router, private authSvc: AuthService) { }

    ngOnInit(): void {
        this.authSvc.checkCookie().subscribe({
            next: (res: boolean) => {
                this.loading = false;
                if (res) {
                    this.success = true;
                    setTimeout(() => {
                        this.router.navigate(['/home']);
                    }, 2000);
                } else {
                    this.success = false;
                    // this.router.navigate(['/login']);
                }
            },
            error(err: any): void {
                console.error('errorcin', err);
                // this.router.navigate(['/login']);
            }
        });
    }

}
