import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { requestReceived } from 'src/app/core/models/request.interface';
import { usuario } from 'src/app/core/models/user.interface';
import { LoginService } from 'src/app/services/login.service';
import { RentalService } from 'src/app/services/rental.service';
import { isDateHigher } from '../alquiler/form-reactivo/calendar/app.validator';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

    private subscripcions: Subscription[] = [];
    user!: usuario
    show!: boolean
    private data = new BehaviorSubject<requestReceived[]>([])

    requestAll!: requestReceived[]
    dataSource!: requestReceived[];
    dataSourcePast!: requestReceived[];
    constructor(private authSvc: LoginService, private requestSvc: RentalService) { }

    ngOnInit(): void {
        this.subscripcions.push(
            this.authSvc.readToken().subscribe(res => this.user = res)
        );

        if (this.user?.userId) {
            this.subscripcions.push(
                this.requestSvc.getRequestByUserId(this.user.userId).pipe(
                    // delay(1700)
                ).subscribe((res) => {
                    this.requestAll = res;
                    this.dataSourcePast = this.requestAll.filter(r => isDateHigher(r.final_date, false, this.getDateTodayToString(), true));
                    this.dataSourcePast.forEach(r => {
                        if (r.state === 'req') {
                            this.completeRequest(r);
                            r.state = 'con';
                        }
                    });
                    this.data.next(this.requestAll);
                    this.dataSource = this.requestAll;

                    setTimeout(() => {
                        this.show = false;
                    }, 1700);
                })
            );
        }
    };

    readData(): Observable<requestReceived[]> {
        return this.data.asObservable();
    };

    getDateTodayToString(): string {
        const datejs: Date = new Date();
        return `${datejs.getDate()}-${datejs.getMonth() + 1}-${datejs.getFullYear()}`
    };

    completeRequest(request: requestReceived): void {
        this.subscripcions.push(
            this.requestSvc.confirmRequestByIdRequest(request.id_request).subscribe({
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
