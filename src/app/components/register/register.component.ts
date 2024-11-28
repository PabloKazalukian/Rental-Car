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

    contactForm!: FormGroup;
    success: boolean = false
    error: boolean = false
    private subscripcions: Subscription[] = [];

    constructor(private readonly fb: FormBuilder, private authSvc: RegisterService, private router: Router) { };


    ngOnInit(): void {
        this.contactForm = this.initForm();
        // console.log(this.contactForm)
        // this.authSvc.verifyEmail("admin@gmail.com").subscribe(e=>console.log(e))
    };

    onSubmit(): void {
        this.subscripcions.push(
            this.authSvc.registerUser(this.contactForm.value).subscribe({
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
            username: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")], !this.validarEmail.bind(this)],
            password1: ['', [Validators.required, Validators.minLength(3)]],
            password2: ['', [Validators.required, Validators.minLength(3)]],
        }, {
            validators: repeatPass.dateCorrect,
        })
    };

    validarEmail(control: AbstractControl) {
        return this.authSvc.verifyEmail(control.value)
            .pipe(
                map(data => {
                    if (data) {
                        return { emailExist: true }
                    } else {
                        return null
                    }
                }),
                catchError(error => {
                    console.log(error);
                    return of({ emailExist: false })
                })
            )
    }

    ngOnDestroy(): void {
        this.subscripcions.forEach((e) => e.unsubscribe())
    }

}
