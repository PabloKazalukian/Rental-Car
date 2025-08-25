import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay, filter, Subscription, switchMap, take, tap } from 'rxjs';
import { CarService } from 'src/app/core/services/car.service';
import { Car } from 'src/app/core/models/car.interface';
import { LoginService } from 'src/app/core/services/auth/login.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { AuthenticatedUser } from 'src/app/core/models/login.interface';
import { StepWithDescription } from 'src/app/shared/components/ui/stepper/stepper.component';


@Component({
    selector: 'app-rental',
    templateUrl: './rental.component.html',
    styleUrls: ['./rental.component.scss']
})
export class RentalComponent implements OnInit, OnDestroy {

    private subscripcions: Subscription[] = [];

    step = 1;
    stepsDescription: StepWithDescription[] = [
        { step: 'Seleccionar auto', description: { routerLink: '/solicitar-auto', text: 'Solicitar otro vehiculo' } },
        { step: 'Elegir fechas' },
        { step: 'Confirmación' }
    ];

    idCar!: string;
    idUser?: string;
    user: AuthenticatedUser = { username: '', sub: '', role: '' };
    cars!: Car;
    autos!: Car[];
    imageLoaded = false;

    constructor(private readonly route: ActivatedRoute, private authSvc: AuthService, private readonly carSvc: CarService, private userSvc: LoginService) { }

    ngOnInit(): void {

        this.imageLoaded = false;


        this.authSvc._user$.pipe(
            take(1),
            filter(user => !!user),
            tap(user => { this.idUser = user.sub; this.user = user }),
            delay(2000)
        ).subscribe();


        this.subscripcions.push(

            this.route.queryParams.pipe(
                switchMap(params => {
                    this.idCar = params['id'];

                    return this.carSvc.getCarById(this.idCar);
                })).subscribe({
                    next: (car) => {
                        this.cars = car;
                    },
                    error: (err) => console.error('Error al obtener el carro:', err)
                })
        );
    };


    ngOnDestroy(): void {
        this.subscripcions.forEach(sub => sub.unsubscribe());
    };
}
