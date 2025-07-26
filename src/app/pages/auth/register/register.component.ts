import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map, of, Subscription } from 'rxjs';
import { ModifyUser, PassDouble, userRegister } from 'src/app/core/models/user.interface';
import { RegisterService } from 'src/app/core/services/register.service';
import { repeatPass } from 'src/app/shared/validators/repeatPass.validator';
import { FormControlsOf } from '../../../shared/utils/form-types.util';


type RegisterType = FormControlsOf<userRegister>;

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

    registerForm!: FormGroup<RegisterType>;
    success: boolean = false;
    error: boolean = false;
    private subscripcions: Subscription[] = [];
    imageUrl: string = 'assets/images/logo-no-background.png';
    imageBackground: string = 'assets/images/superdeportivo_optimized.jpg';
    hide = true;

    constructor(private authSvc: RegisterService, private router: Router) { };

    ngOnInit(): void {
        this.registerForm = this.initForm();
    };

    onSubmit(): void {
        const userRegister: userRegister = {
            username: this.registerForm.controls.username.value,
            email: this.registerForm.controls.email.value,
            password: this.registerForm.controls.password.value,
            confirmPassword: this.registerForm.controls.confirmPassword.value
        };

        this.subscripcions.push(
            this.authSvc.registerUser(userRegister).subscribe({
                next: (res) => {
                    this.success = true;
                    setTimeout(() => this.router.navigate(['auth/login']), 1700)
                },
                error: (res) => {
                    this.success = false;
                    this.error = true;
                }
            })
        )
    };

    initForm(): FormGroup<RegisterType> {
        //declarar las propiedas que tendran nuestro formulario
        return new FormGroup<RegisterType>({
            username: new FormControl('', {
                nonNullable: true,
                validators: [Validators.required, Validators.minLength(3)],
                asyncValidators: [this.validateUsername.bind(this)]
            }),
            email: new FormControl('', {
                nonNullable: true,
                validators: [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")],
                asyncValidators: [this.validateEmail.bind(this)]
            }),
            password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
            confirmPassword: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),

        }, {
            validators: repeatPass.samePassword,
        });
    };

    validateEmail(control: AbstractControl) {

        return this.authSvc.verifyEmail(control.value)
            .pipe(
                map(data => {
                    return data ? { emailExist: true } : null
                }),
                catchError(error => {
                    return of(null)
                })
            )
    }

    validateUsername(control: AbstractControl) {
        return this.authSvc.verifyUsername(control.value)
            .pipe(
                map(data => {
                    return data ? { usernameExist: true } : null
                }),
                catchError(error => {
                    return of(null)
                })
            )
    }

    get usernameControl(): FormControl<string> {
        return this.registerForm.get('username') as FormControl<string>;
    }

    get emailControl(): FormControl<string> {
        return this.registerForm.get('email') as FormControl<string>;
    }

    get passwordControl(): FormControl<string> {
        return this.registerForm.get('password') as FormControl<string>;
    }

    get confirmPasswordControl(): FormControl<string> {
        return this.registerForm.get('confirmPassword') as FormControl<string>;
    }

    ngOnDestroy(): void {
        this.subscripcions.forEach((e) => e.unsubscribe())
    }
}
