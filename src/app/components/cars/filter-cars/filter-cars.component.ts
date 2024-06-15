import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Car } from 'src/app/core/models/car.interface';
import { Store, select } from '@ngrx/store';


interface appState {
    loading: boolean,
    cars: Array<Car>
    car: Array<Car>
}

interface text {
    model: string | '',
    brand: string | ''
}


@Component({
    selector: 'app-filter-cars',
    templateUrl: './filter-cars.component.html',
    styleUrls: ['./filter-cars.component.css']
})
export class FilterCarsComponent implements OnInit {

    @Input() orderPrice: any;
    @Input() orderBrand: any;
    @Input() orderYear: any;
    textModel?: string = '';
    textBrand?: string = '';
    @Input() searchBrand!: string;
    @Input() searchModel!: string;


    @Output() newSearchEvent = new EventEmitter<text>();
    @Output() newOrderEvent = new EventEmitter<string>();

    constructor(private store: Store<{ autos: appState }>) { }

    ngOnInit(): void {
        if (this.searchModel || this.searchBrand) {
            this.textModel = this.searchModel;
            this.textBrand = this.searchBrand;
        }
    };

    public searchFilter(): void {
        this.newSearchEvent.emit({ model: this.textModel ? this.textModel : '', brand: this.textBrand ? this.textBrand : '' });
    };

    public order(order: string): void {
        this.newOrderEvent.emit(order);
    };

}

