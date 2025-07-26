import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CredentialsService } from 'src/app/core/services/auth/credential.service';
import { LoginService } from 'src/app/core/services/auth/login.service';
import { environment } from 'src/environments/environment';

interface LoginForm {
    email: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
};


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit, OnDestroy {

    contactForm!: FormGroup<LoginForm>;
    login!: boolean;
    loading: boolean = false;
    private subscriptions: Subscription[] = [];
    showPas: boolean = false;
    @ViewChild('MyRef') passwordInput!: ElementRef;

    private readonly API = `${environment.api}/auth`;


    constructor(private loginSvc: LoginService, private credentialsSvc: CredentialsService, private router: Router) { }

    ngOnInit(): void {
        const credentials = this.credentialsSvc.getCredentials();
        this.contactForm = this.initForm();

        console.log(credentials)
        if (credentials.remember) {
            this.contactForm.patchValue({
                email: credentials.username ?? '',
                password: credentials.password ?? '',
                remember: credentials.remember
            });
        }
    }


    initForm(): FormGroup<LoginForm> {
        return new FormGroup<LoginForm>({
            email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
            password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
            remember: new FormControl(false, { nonNullable: true })
        });
    }


    onSubmit(): void {
        this.loading = true;
        this.subscriptions.push(
            this.loginSvc.login({
                email: this.contactForm.get('email')?.value ?? '',
                password: this.contactForm.get('password')?.value ?? '',
            }).subscribe({
                next: (res) => {
                    console.log(res);
                    if (this.contactForm.get('remember')?.value) {
                        this.credentialsSvc.saveCredentials({
                            remember: this.contactForm.get('remember')?.value ?? false,
                            username: this.contactForm.get('email')?.value ?? '',
                            password: this.contactForm.get('password')?.value ?? ''
                        });
                    } else {
                        this.credentialsSvc.removeCredentials();
                    }
                    this.loading = false;
                    this.login = true;
                    setTimeout(() => this.router.navigate(['/']), 2000);
                },
                error: (res) => {
                    this.loading = false;
                    this.login = false;
                },
            })
        );
    }
    loginWithGoogle() {
        console.log('Iniciando sesión con Google...');
        window.location.href = `${this.API}/google?redirectUri=${window.location.origin}/auth/callback`;
    }

    showPassword(event: boolean): void {
        event ? this.passwordInput.nativeElement.type = "text" : this.passwordInput.nativeElement.type = "password";
    }

    get emailControl(): FormControl<string> {
        return this.contactForm.get('email')! as FormControl<string>;
    }

    get passwordControl(): FormControl<string> {
        return this.contactForm.get('password')! as FormControl<string>;
    }

    get rememberControl(): FormControl<boolean> {
        return this.contactForm.get('remember')! as FormControl<boolean>;
    }


    ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }
}
