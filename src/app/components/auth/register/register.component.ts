import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map, of, Subscription } from 'rxjs';
import { RegisterService } from 'src/app/services/register.service';
import { repeatPass } from 'src/app/shared/repeatPass.validator';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

    registerForm!: FormGroup;
    success: boolean = false;
    error: boolean = false;
    private subscripcions: Subscription[] = [];
    imageUrl: string = 'assets/images/logo-no-background.png';
    imageBackground: string = 'assets/images/superdeportivo_optimized.jpg';

    constructor(private readonly fb: FormBuilder, private authSvc: RegisterService, private router: Router) { };
    hide = true;


    ngOnInit(): void {
        this.registerForm = this.initForm();
        // console.log(this.registerForm)
        // this.authSvc.verifyEmail("admin@gmail.com").subscribe(e=>console.log(e))
    };

    onSubmit(): void {
        this.subscripcions.push(
            this.authSvc.registerUser(this.registerForm.value).subscribe({
                next: (res) => {
                    this.success = true;
                    setTimeout(() => this.router.navigate(['login']), 1700)
                },
                error: (res) => {
                    this.success = false;
                    this.error = true;
                }
            })
        )
    };

    initForm(): FormGroup {
        //declarar las propiedas que tendran nuestro formulario
        return this.fb.group({
            username: ['', [Validators.required, Validators.minLength(3)], this.validateUsername.bind(this)],
            email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")], this.validateEmail.bind(this)],
            password1: ['', [Validators.required, Validators.minLength(3)]],
            password2: ['', [Validators.required, Validators.minLength(3)]],
        }, {
            validators: repeatPass.dateCorrect,
        })
    };

    validateEmail(control: AbstractControl) {
        console.log(control)

        return this.authSvc.verifyEmail(control.value)
            .pipe(
                map(data => {
                    if (data) {
                        console.log(data);
                        return { emailExist: true }
                    } else {
                        return null
                    }
                }),
                catchError(error => {
                    console.log(error);
                    console.log(control)
                    return of(null)
                })
            )
    }

    validateUsername(control: AbstractControl) {
        return this.authSvc.verifyUsername(control.value)
            .pipe(
                map(data => {
                    console.log(data);
                    if (data) {
                        return { usernameExist: true }
                    } else {
                        return null
                    }
                }),
                catchError(error => {
                    console.log(error);
                    return of(null)
                })
            )
    }

    ngOnDestroy(): void {
        this.subscripcions.forEach((e) => e.unsubscribe())
    }

}
