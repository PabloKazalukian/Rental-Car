import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
    selector: 'app-callback',
    templateUrl: './callback.component.html',
    styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

    success: boolean = false;
    loading: boolean = true;

    constructor(private router: Router, private authSvc: LoginService) { }

    ngOnInit(): void {
        this.authSvc.test().subscribe({
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
