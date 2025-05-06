import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
    selector: 'app-callback',
    templateUrl: './callback.component.html',
    styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

    constructor(private router: Router, private authSvc: LoginService) { }

    ngOnInit(): void {
        this.authSvc.test().subscribe({
            next: (res: boolean) => {
                console.log('completin', res);
                if (res) {
                    setTimeout(() => {
                        this.router.navigate(['/home']);
                    }, 2000);
                } else {
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
