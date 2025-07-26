import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription, switchMap, tap } from 'rxjs';
import { RequestReceived } from 'src/app/core/models/request.interface';
import { Usuario } from 'src/app/core/models/user.interface';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { RentalService } from 'src/app/core/services/rental.service';
import { isDateHigher } from 'src/app/shared/validators/date.validator';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit, OnDestroy {

    private subscripcions: Subscription[] = [];
    user!: Usuario
    user$ = this.authSvc._user$;
    show!: boolean
    private data = new BehaviorSubject<RequestReceived[]>([])

    requestAll!: RequestReceived[]
    dataSource!: RequestReceived[];
    dataSourcePast!: RequestReceived[];
    constructor(private authSvc: AuthService, private requestSvc: RentalService) { }

    ngOnInit(): void {
        this.subscripcions.push(
            this.user$.pipe(
                tap(user => this.user = user),
                switchMap(user => user.sub
                    ? this.requestSvc.getRequestByUserId(user.sub)
                    : of([])
                )
            ).subscribe({
                next: (res) => {
                    this.requestAll = res;
                    this.data.next(this.requestAll);
                    this.dataSource = this.requestAll;

                    setTimeout(() => {
                        this.show = false;
                    }, 1700);
                },
                error: (err: any) => {
                    console.error(err);
                }
            })
        )
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
