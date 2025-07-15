import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { LoginService } from 'src/app/core/services/auth/login.service';


@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit, OnDestroy {


    private subscripcions: Subscription[] = [];

    islogged: boolean = true;

    constructor(private authnSvc: AuthService) {
        this.subscripcions.push(
            this.authnSvc._loggenIn$.subscribe(res => this.islogged = res)
        )
    }


    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.subscripcions.forEach(sub => sub.unsubscribe());
    }

}
