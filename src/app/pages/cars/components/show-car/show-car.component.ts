import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/core/models/car.interface';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { loadCar, orderBrandCar } from '../../../../store/cars/car.actions';
import { LoginService } from 'src/app/core/services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogLoggedComponent } from './dialog-logged/dialog-logged.component';
import { OverlayService } from '../../../../shared/services/ui/overlay.service';
import { DialogComponent } from 'src/app/shared/components/ui/dialog/dialog.component';
import { ModalCarComponent } from './modal-car/modal-car.component';

interface appState {
    loading: boolean,
    cars: Array<Car>
    car: Array<Car>
}

@Component({
    selector: 'app-show-car',
    templateUrl: './show-car.component.html',
    styleUrls: ['./show-car.component.css']

})
export class ShowCarComponent implements OnInit, OnDestroy {

    private subscripcions: Subscription[] = [];

    carsTotal!: appState;
    cars!: Array<Car>;
    car$!: Observable<Car>;
    searchModel: string = '';
    searchBrand: string = '';
    searchBoolean: boolean = false;
    loading: boolean = true;
    notLogged!: Observable<boolean>;

    constructor(private store: Store<{ autos: appState }>, readonly route: ActivatedRoute, private readonly router: Router, private loginSvc: LoginService, public dialog: MatDialog,
        private overlayService:OverlayService
    ) { }

    ngOnInit(): void {
        this.loading = true;
        this.subscripcions.push(
            this.route.queryParams.subscribe(
                (params) => {
                    this.searchModel = params['model'];
                    this.searchBrand = params['brand'];
                    this.searchBoolean = true;
                    // this.search({ model: this.searchModel || '', brand: this.searchBrand || '' });
                }
            )
        );
        this.chargeData();
    };

    goWithCar(id: number): void {

        this.subscripcions.push(
            this.loginSvc.isLoggin().subscribe(e => {
                if (e) {
                    this.router.navigate(['alquiler'], { queryParams: { id } });
                } else {
                    // this.notLogged.subscribe(e=>{e=true;console.log(e)});
                    const dialogRef = this.dialog.open(DialogLoggedComponent);
                }
            })
        );
    };

    chargeData(): void {
        this.store.dispatch(orderBrandCar({ asc: true }));
        // console.log(this.searchModel)
        // this.store.dispatch(searchCar({ brand: this.searchBrand || '', model: this.searchModel || '' }));
        this.subscripcions.push(
            this.store.select('autos').subscribe((e) => {
                if (e.loading === false) {
                    this.store.dispatch(loadCar());
                } else {
                    // console.log(e);

                    if (e.car.length !== 0 || this.loading === false) {
                        this.cars = e.car;
                        this.loading = false;
                    }
                }
            })
        );

    };

    // abrirDialog(): void {
    //    this.dialogService.open();
    // }

    abrirModalCar(auto: Car): void {
     this.overlayService.open(ModalCarComponent, {
        data: auto
    });
}

    ngOnDestroy(): void {
        this.subscripcions.forEach(sub => sub.unsubscribe());
    };
}
