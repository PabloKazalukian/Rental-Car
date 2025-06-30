import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/core/services/login.service';


@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit, OnDestroy {


    private subscripcions: Subscription[] = [];

    islogged: boolean = true;

    constructor(private loginSvc: LoginService) {
        this.subscripcions.push(
            this.loginSvc.isLoggin().subscribe(res => this.islogged = res)
        )
    }


    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.subscripcions.forEach(sub => sub.unsubscribe());
    }

}
