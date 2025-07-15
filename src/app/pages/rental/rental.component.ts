import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CarService } from 'src/app/core/services/car.service';
import { Car } from 'src/app/core/models/car.interface';
import { LoginService } from 'src/app/core/services/auth/login.service';


@Component({
    selector: 'app-rental',
    templateUrl: './rental.component.html',
    styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit, OnDestroy {

    private subscripcions: Subscription[] = [];

    step = 1;
    idCar!: string;
    idUser?: string;
    cars!: Car;
    autos!: Car[];
    imageLoaded = false;

    constructor(private readonly route: ActivatedRoute, private readonly carSvc: CarService, private userSvc: LoginService) { }

    ngOnInit(): void {

        this.imageLoaded = false;

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

    onImageLoad(): void {
        // Forzar 2 segundos antes de mostrar la imagen
        setTimeout(() => {
            this.imageLoaded = true;
        }, 1000);
    }

    ngOnDestroy(): void {
        this.subscripcions.forEach(sub => sub.unsubscribe());
    };
}
