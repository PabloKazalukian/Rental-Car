import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from './../../../services/login.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

    contactForm!: FormGroup;
    login!: boolean;
    // login: boolean = true;
    private subscripcions: Subscription[] = [];
    showPas: boolean = false;
    remember: boolean = false;
    @ViewChild('MyRef') passwordInput!: ElementRef;
    hide: boolean = true;

    constructor(private readonly fb: FormBuilder, private authSvc: LoginService, private router: Router) { }


    ngOnInit(): void {
        const credentials = this.authSvc.getCredentials();
        this.contactForm = this.initForm();
        this.remember = credentials.remember;

        if (this.remember) {
            this.contactForm.patchValue({ email: credentials.username, password: credentials.password });
        }
    };

    onSubmit(): void {

        this.subscripcions.push(
            this.authSvc.checkLogin(this.contactForm.value).subscribe({
                next: (res) => {
                    if (this.remember) {
                        this.authSvc.saveCredentials({ remember: this.remember, username: this.contactForm.get('email')?.value, password: this.contactForm.get('password')?.value })
                    } else {
                        this.authSvc.removeCredentials();
                    }
                    this.login = true;
                    setTimeout(() => this.router.navigate(['/']), 2000)
                },
                error: (res) => {
                    this.login = false
                },
            })
        )
    };

    initForm(): FormGroup {
        //declarar las propiedas que tendran nuestro formulario
        return this.fb.group({
            email: ['', [Validators.required, Validators.minLength(3)]],
            // Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
            password: ['', [Validators.required, Validators.minLength(3)]],
        })
    };

    showPassword(event: boolean) {
        event ? this.passwordInput.nativeElement.type = "text" : this.passwordInput.nativeElement.type = "password"
    };

    rememberMe(event: boolean) {
        this.remember = event;
    };

    ngOnDestroy(): void {
        this.subscripcions.forEach((e) => e.unsubscribe())
    };

}
