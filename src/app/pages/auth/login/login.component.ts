import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CredentialsService } from 'src/app/core/services/auth/credential.service';
import { LoginService } from 'src/app/core/services/auth/login.service';
import { environment } from 'src/environments/environment';

declare const google: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

    contactForm!: FormGroup;
    login!: boolean;
    private subscriptions: Subscription[] = [];
    showPas: boolean = false;
    remember: boolean = false;
    @ViewChild('MyRef') passwordInput!: ElementRef;
    // hide: boolean = true;
    private readonly API = `${environment.api}/auth`;


    constructor(private readonly fb: FormBuilder, private loginSvc: LoginService, private authSvc: AuthService, private credentialsSvc: CredentialsService, private router: Router) { }

    ngOnInit(): void {
        const credentials = this.credentialsSvc.getCredentials();
        this.contactForm = this.initForm();
        // console.log( typeof this.contactForm.get('password') )
        this.remember = credentials.remember;

        if (this.remember) {
            this.contactForm.patchValue({
                email: credentials.username,
                password: credentials.password
            });
        }
    }

    initForm(): FormGroup {
        return this.fb.group({
            email: ['', [Validators.required, Validators.minLength(3)]],
            password: ['', [Validators.required, Validators.minLength(3)]],
        });
    }

    onSubmit(): void {
        this.subscriptions.push(
            this.loginSvc.login(this.contactForm.value).subscribe({
                next: (res) => {
                    console.log(res);
                    if (this.remember) {
                        this.credentialsSvc.saveCredentials({
                            remember: this.remember,
                            username: this.contactForm.get('email')?.value,
                            password: this.contactForm.get('password')?.value
                        });
                    } else {
                        this.credentialsSvc.removeCredentials();
                    }
                    this.login = true;
                    setTimeout(() => this.router.navigate(['/']), 2000);
                },
                error: (res) => {
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

    rememberMe(event: boolean): void {
        this.remember = event;
    }

    get emailControl(): FormControl {
        return this.contactForm.get('email') as FormControl;
    }

    get passwordControl(): FormControl {
        return this.contactForm.get('password') as FormControl;
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }
}
