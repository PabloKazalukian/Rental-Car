import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { RequestReceived } from 'src/app/core/models/request.interface';
import { Usuario } from 'src/app/core/models/user.interface';
import { LoginService } from 'src/app/core/services/login.service';
import { RentalService } from 'src/app/core/services/rental.service';
import { isDateHigher } from 'src/app/shared/validators/date.validator';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

    private subscripcions: Subscription[] = [];
    user!: Usuario
    show!: boolean
    private data = new BehaviorSubject<RequestReceived[]>([])

    requestAll!: RequestReceived[]
    dataSource!: RequestReceived[];
    dataSourcePast!: RequestReceived[];
    constructor(private authSvc: LoginService, private requestSvc: RentalService) { }

    ngOnInit(): void {
        this.subscripcions.push(
            this.authSvc.readToken().subscribe(res => this.user = res)
        );

        if (this.user.sub) {
            this.subscripcions.push(
                this.requestSvc.getRequestByUserId(this.user.sub).pipe(
                    // delay(1700)
                ).subscribe((res) => {
                    this.requestAll = res;
                    // this.dataSourcePast = this.getExpiredRequests(this.requestAll);
                    // .filter(r => isDateHigher(r.finalDate, false, this.getDateTodayToString(), true));
                    // this.dataSourcePast.forEach(r => {
                    //     if (r.state === 'req') {
                    //         this.completeRequest(r);
                    //         r.state = 'con';
                    //     }
                    // });
                    this.data.next(this.requestAll);
                    this.dataSource = this.requestAll;

                    setTimeout(() => {
                        this.show = false;
                    }, 1700);
                })
            );
        }
    };

    private getExpiredRequests(requests: any[]): any[] {
        return requests.filter(request =>
            this.isExpiredDate(request.finalDate, this.getCurrentDateAsString())
        );
    }

    private isExpiredDate(finalDate: string, currentDate: string): boolean {
        return isDateHigher(finalDate, currentDate, true);
    }

    private getCurrentDateAsString(): string {
        return this.getDateTodayToString();
    }

    readData(): Observable<RequestReceived[]> {
        return this.data.asObservable();
    };

    private getDateTodayToString(): string {
        const datejs: Date = new Date();
        return `${datejs.getDate()}-${datejs.getMonth() + 1}-${datejs.getFullYear()}`
    };

    completeRequest(request: RequestReceived): void {
        this.subscripcions.push(
            this.requestSvc.confirmRequestByIdRequest(request.id).subscribe({
                next: (res) => {
                    console.log(res);
                },
                error: (res) => {
                    console.log(res);
                },
            })
        )
    };

    ngOnDestroy(): void {
        this.subscripcions.forEach((e) => e.unsubscribe())
    };

}
