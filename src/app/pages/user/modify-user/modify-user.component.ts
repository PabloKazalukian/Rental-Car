import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, catchError, map } from 'rxjs';
import { usuario } from 'src/app/core/models/user.interface';
import { LoginService } from 'src/app/core/services/login.service';
import { RegisterService } from 'src/app/core/services/register.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
    selector: 'app-modify-user',
    templateUrl: './modify-user.component.html',
    styleUrls: ['./modify-user.component.css']
})

export class ModifyUserComponent implements OnInit, OnDestroy {

    private subscripcions: Subscription[] = [];

    modifyUser!: FormGroup;
    usuario!: usuario;
    success: boolean = false;
    error: boolean = false;
    userNameErrors = {
    required: 'Este campo es requerido',
    minlength: 'Debe tener al menos 3 caracteres',
};

emailErrors = {
    required: 'Este campo es requerido',
    pattern: 'Formato de email inválido',
    emailExist: 'Email existente',
};

    constructor(private readonly fb: FormBuilder, private loginSvc: LoginService, private authSvc: RegisterService, private userSvc: UserService, private router: Router) { }

    ngOnInit(): void {
        this.modifyUser = this.initForm();
        this.subscripcions.push(
            this.loginSvc.readToken().subscribe(res => this.usuario = res)
        );
    };

    onSubmit(): void {
        if (this.usuario.sub !== undefined) {
            this.subscripcions.push(
                this.userSvc.modifyUser(this.modifyUser.value, this.usuario.sub).subscribe({
                    next: (res) => {
                        this.success = true;
                        setTimeout(() => {
                            this.router.navigate(['/usuario']);
                        }, 2000);
                    },
                    error: (res) => {
                        this.success = false;
                        this.error = true;
                    }
                })
            );
        };
    };


    initForm(): FormGroup {
        //declarar las propiedas que tendran nuestro formulario
        return this.fb.group({
            username: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")], this.validarEmail.bind(this)],

        });
    };

    validarEmail(control: AbstractControl) {
        return this.authSvc.verifyEmail(control.value)
            .pipe(
                map(data => {
                    if (data) {
                        return { emailExist: true }
                    } else {
                        return null;
                    };
                }),
                catchError(error => error)
            )
    };

    ngOnDestroy(): void {
        this.subscripcions.forEach((e) => e.unsubscribe());
    };

}
