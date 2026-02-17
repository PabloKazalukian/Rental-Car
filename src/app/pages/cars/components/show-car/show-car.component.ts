import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/core/models/car.interface';
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, take } from 'rxjs';
import { loadCar, orderBrandCar } from '../../../../store/cars/car.actions';
import { OverlayService } from '../../../../shared/services/ui/overlay.service';
import { DialogComponent } from 'src/app/shared/components/ui/dialog/dialog.component';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { ModalComponent } from 'src/app/shared/components/ui/modal/modal.component';

interface appState {
    loading: boolean;
    cars: Array<Car>;
    car: Array<Car>;
}

@Component({
    selector: 'app-show-car',
    templateUrl: './show-car.component.html',
    styleUrls: ['./show-car.component.scss'],
})
export class ShowCarComponent implements OnInit, OnDestroy {
    @ViewChild('btnDialog') btnDialog!: TemplateRef<any>;
    @ViewChild('contentDialog') contentDialog!: TemplateRef<any>;

    private subscripcions: Subscription[] = [];

    carsTotal!: appState;
    cars!: Array<Car>;
    car$!: Observable<Car>;
    searchModel: string = '';
    searchBrand: string = '';
    searchBoolean: boolean = false;
    loading: boolean = true;
    notLogged!: Observable<boolean>;

    constructor(
        private store: Store<{ autos: appState }>,
        readonly route: ActivatedRoute,
        private readonly router: Router,
        private authSvc: AuthService,
        private overlayService: OverlayService,
    ) {}

    ngOnInit(): void {
        this.loading = true;
        this.subscripcions.push(
            this.route.queryParams.subscribe((params) => {
                this.searchModel = params['model'];
                this.searchBrand = params['brand'];
                this.searchBoolean = true;
            }),
        );
        this.chargeData();
    }

    goWithCar(id: number): void {
        this.subscripcions.push(
            this.authSvc._loggenIn$.pipe(take(1)).subscribe((e) => {
                this.overlayService.closeAll();
                if (e) {
                    this.router.navigate(['alquiler'], { queryParams: { id } });
                } else {
                    this.overlayService.closeAll();
                    this.overlayService.open(DialogComponent, {
                        actions: this.btnDialog,
                        content: this.contentDialog,
                        title: 'Iniciar sesion para poder continuar!',
                    });
                }
            }),
        );
    }

    chargeData(): void {
        this.store.dispatch(orderBrandCar({ asc: true }));

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
            }),
        );
    }

    abrirModalCar(template: TemplateRef<any>, contentActions: TemplateRef<any>, car: Car): void {
        this.overlayService.open(ModalComponent, {
            title: ` ${car.brand.toUpperCase()}-${car.model.toUpperCase()}`,
            subtitle: '¿Estás seguro de continuar?',
            content: template,
            actions: contentActions,
            showClose: true,
            logo: 'assets/logo.svg',
        });
    }

    ngOnDestroy(): void {
        this.subscripcions.forEach((sub) => sub.unsubscribe());
    }
}
