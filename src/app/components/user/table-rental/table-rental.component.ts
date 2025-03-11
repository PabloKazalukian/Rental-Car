import { Component, Input, OnInit } from '@angular/core';
import { request, requestReceived } from 'src/app/core/models/request.interface';
import { Subscription } from 'rxjs';
import { isDateHigher } from '../../alquiler/form-reactivo/calendar/app.validator';
import { RentalService } from 'src/app/services/rental.service';
import { delay, tap, take } from "rxjs/operators";
import { usuario } from 'src/app/core/models/user.interface';
import { UserComponent } from '../user.component';

@Component({
    selector: 'app-table-rental',
    templateUrl: './table-rental.component.html',
    styleUrls: ['./table-rental.component.css']
})
export class TableRentalComponent implements OnInit {

    private subscripcions: Subscription[] = [];

    @Input() user!: usuario
    show!: boolean
    request!: requestReceived[]
    dataSource!: requestReceived[];
    displayedColumns: string[] = ['initial_date', 'final_date', 'brand', 'model', 'amount', 'modify'];

    constructor(private requestSvc: RentalService, private data: UserComponent) { }


    ngOnInit(): void {
        this.show = true;
        setTimeout(() =>
            this.subscripcions.push(
                this.data.readData().subscribe(e => {
                    console.log(e)
                    if (e !== undefined) {
                        this.dataSource = e;
                        this.request = e;
                        this.show = false;
                        // console.log(this.dataSource)
                    }
                })
            )
            , 2000);
        // this.dataSource.next(e=>console.log(e))

        // if(this.user?.userId){
        //   this.subscripcions.push(
        //     this.requestSvc.getRequestByUserId(this.user.userId).pipe(
        //       // delay(1700)
        //     ).subscribe((res)=>{
        //       console.log(res)
        //       this.request=res;
        //       const datejs:Date = new Date();
        //       const jsFinalDate = `${datejs.getDate()}-${datejs.getMonth() + 1}-${datejs.getFullYear()}`
        //       this.dataSourcePast =  this.request.filter(r=>isDateHigher(r.final_date,false,jsFinalDate,true));
        //       console.log(this.dataSourcePast);
        //       this.dataSourcePast.forEach(r=>{
        //           if(r.state==='req'){
        //             this.completeRequest(r);
        //             r.state= 'con';
        //           }
        //       })
        //       this.dataSource = this.request;

        //       setTimeout(()=> {
        //         this.show=false;
        //       },1700)
        //     })
        //   )

        // }
    };


    // completeRequest(request:request):void{
    //   this.subscripcions.push(
    //     this.requestSvc.confirmRequestByIdRequest(request.id_request).subscribe({
    //       next: (res)=>{
    //         // element.state = 'con';
    //         console.log(res);
    //       },
    //       error: (res)=>{
    //         // this.login=false
    //       },
    //     })
    //   )
    // }

    cancelRequest(element: any): void {
        element.state = 'cancel'
        this.subscripcions.push(
            this.requestSvc.cancelRequestByIdRequest(element.id).subscribe({
                next: (res) => {
                    element.state = 'cancelNow';
                },
                error: (res) => {
                    // this.login=false
                },
            })
        )
    };

    confirmRequest(element: any): void {
        // confirmRequestByIdRequest
        element.state = 'cancel'
        this.subscripcions.push(
            this.requestSvc.confirmRequestByIdRequest(element.id).subscribe({
                next: (res) => {
                    element.state = 'con';
                },
                error: (res) => {
                    // this.login=false
                },
            })
        )
    };

    ngOnDestroy(): void {
        this.subscripcions.forEach((e) => e.unsubscribe())
    };
}
