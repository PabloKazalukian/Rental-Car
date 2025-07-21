import { Car } from 'src/app/core/models/car.interface';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { searchCar, orderPriceCar, orderBrandCar, orderYearCar } from '../../store/cars/car.actions';
import { CarService } from '../../core/services/car.service';
import { ActivatedRoute } from '@angular/router';


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
    selector: 'app-cars',
    templateUrl: './cars.component.html',
    styleUrls: ['./cars.component.scss']
})

export class CarsComponent implements OnInit, OnDestroy {

    private subscripcions: Subscription[] = [];

    // carsTotal!: appState;
    // cars!: Array<Car>;
    estado!: boolean;
    car$!: Observable<Car>;
    searchModel!: string;
    searchBrand!: string;
    searchParams: boolean = false;
    loading$!: boolean | false;
    ascPrice: boolean = false;
    ascBrand: boolean = false;
    ascYear: boolean = false;
    brand!: string;
    model!: string;
    autos?: any = [];
    carObservable: Subject<any> = new Subject();

    constructor(private store: Store<{ autos: appState }>, readonly route: ActivatedRoute, private readonly carSvc: CarService) { }

    ngOnInit(): void {
        this.estado = false;

        this.subscripcions.push(
            this.carSvc.getAllCars().subscribe(
                car => {
                    this.autos = car
                    this.estado = true;
                }
            )
        );

        this.route.queryParams.subscribe(
            (params) => {
                this.searchModel = params['model'];
                this.searchBrand = params['brand'];
            }
        )
        this.subscripcions.push(
            this.store.select('autos').subscribe((state: appState): void => {
                if (this.searchParams === false && state.loading !== false) {
                    this.store.dispatch(searchCar({ brand: this.searchBrand || '', model: this.searchModel || '' }));
                    this.searchParams = true;
                }
            })
        );

    };

    public search(text?: text): void {
        this.store.dispatch(searchCar({ brand: text?.brand || '', model: text?.model || '' }));
    };

    public order(order: string): void {
        switch (order) {
            case 'price':
                this.orderPrice();
                break;
            case 'brand':
                this.orderBrand();
                break;
            case 'year':
                this.orderYear();
                break;
            default:
        }

    };

    public orderPrice(): void {
        this.ascPrice = !this.ascPrice;
        this.store.dispatch(orderPriceCar({ asc: this.ascPrice }));
        this.ascBrand = !this.ascBrand;
    };

    public orderBrand(): void {
        this.ascBrand = !this.ascBrand;
        this.ascPrice = !this.ascPrice;

        this.store.dispatch(orderBrandCar({ asc: this.ascBrand }));
    };

    public orderYear(): void {
        this.ascYear = !this.ascYear;
        this.ascPrice = !this.ascPrice;

        this.store.dispatch(orderYearCar({ asc: this.ascYear }));
    };

    ngOnDestroy(): void {
        this.subscripcions.forEach(sub => sub.unsubscribe());
    };
}
