import { Component, Input, OnInit } from '@angular/core';
import { request, requestReceived } from 'src/app/core/models/request.interface';
import { Subscription } from 'rxjs';
import { isDateHigher } from '../../alquiler/form-reactivo/calendar/app.validator';
import { RentalService } from 'src/app/services/rental.service';
import { delay, tap, take } from "rxjs/operators";
import { usuario } from 'src/app/core/models/user.interface';
import { UserComponent } from '../user.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

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
    dataSourceComplete!: requestReceived[];
    displayedColumns: string[] = ['initial_date', 'final_date', 'brand', 'model', 'amount', 'modify'];

    constructor(private requestSvc: RentalService, private data: UserComponent) { }


    ngOnInit(): void {
        this.show = true;
        setTimeout(() =>
            this.subscripcions.push(
                this.data.readData().subscribe(e => {
                    if (e !== undefined) {
                        this.dataSource = e;
                        this.dataSourceComplete = e;
                        this.request = e;
                        this.show = false;
                    }
                })
            )
            , 2000);
    };



    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        // console.log(filterValue)
        if (filterValue) {
            this.dataSource = this.dataSourceComplete.filter(({ car_id }) => car_id.model.toLowerCase().includes(filterValue) || car_id.brand.toLowerCase().includes(filterValue.toLowerCase()));
        } else {
            this.dataSource = this.dataSourceComplete
        }
        // this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    cancelRequest(element: any): void {
        // element.state = 'cancel';
        console.log(element)
        this.subscripcions.push(
            this.requestSvc.cancelRequestByIdRequest(element.id).subscribe({
                next: (res) => {
                    element.state = 'cancelNow';
                },
                error: (res) => {
                    console.log(res)
                    // this.login=false
                },
            })
        )
    };

    confirmRequest(element: any): void {
        // confirmRequestByIdRequest
        // element.state = 'can'
        console.log(element.id)
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
