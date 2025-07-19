import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, Subscription, switchMap, take, tap } from 'rxjs';
import { CarService } from 'src/app/core/services/car.service';
import { Car } from 'src/app/core/models/car.interface';
import { LoginService } from 'src/app/core/services/auth/login.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Usuario } from 'src/app/core/models/user.interface';


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
    user: Usuario = { username: '', sub: '', role: '' };
    cars!: Car;
    autos!: Car[];
    imageLoaded = false;

    constructor(private readonly route: ActivatedRoute, private authSvc: AuthService, private readonly carSvc: CarService, private userSvc: LoginService) { }

    ngOnInit(): void {

        this.imageLoaded = false;


        this.authSvc._user$.pipe(
            take(1),
            filter(user => !!user),
            tap(user => { this.idUser = user.sub; this.user = user; console.log('Usuario autenticado:', user) }),
        ).subscribe();


        this.subscripcions.push(

            this.route.queryParams.pipe(
                switchMap(params => {
                    this.idCar = params['id'];

                    return this.carSvc.getCarById(this.idCar);
                })).subscribe({
                    next: (car) => {
                        this.cars = car;
                        // console.log('Carro seleccionado:', this.cars);
                    },
                    error: (err) => console.error('Error al obtener el carro:', err)
                })
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
