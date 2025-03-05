import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/core/models/car.interface';
import { LoginService } from 'src/app/services/login.service';


@Component({
    selector: 'app-alquiler',
    templateUrl: './alquiler.component.html',
    styleUrls: ['./alquiler.component.css']
})
export class AlquilerComponent implements OnInit, OnDestroy {

    private subscripcions: Subscription[] = [];

    idCar!: string;
    idUser?: string;
    cars!: Car
    autos!: Car[]

    constructor(private readonly route: ActivatedRoute, private readonly carSvc: CarService, private userSvc: LoginService) { }

    ngOnInit(): void {

        this.subscripcions.push(
            this.route.queryParams.subscribe(
                (params) => this.idCar = params['id']
            )
        );

        this.subscripcions.push(
            this.userSvc.readToken().subscribe(res => {
                this.idUser = res.sub;
            })
        );

        this.subscripcions.push(
            this.carSvc.getCarById(this.idCar).subscribe(
                car => this.cars = car
            )
        );
    };

    ngOnDestroy(): void {
        this.subscripcions.forEach(sub => sub.unsubscribe());
    };
}
