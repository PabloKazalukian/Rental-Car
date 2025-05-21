import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { LoginService } from './../../../services/login.service';
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
    hide: boolean = true;
    private googleClient: any;
    private readonly API = `${environment.api}/auth`;


    constructor(private readonly fb: FormBuilder, private authSvc: LoginService, private router: Router) { }

    ngOnInit(): void {
        const credentials = this.authSvc.getCredentials();
        this.contactForm = this.initForm();
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
            this.authSvc.checkLogin(this.contactForm.value).subscribe({
                next: (res) => {
                    console.log(res);
                    if (this.remember) {
                        this.authSvc.saveCredentials({
                            remember: this.remember,
                            username: this.contactForm.get('email')?.value,
                            password: this.contactForm.get('password')?.value
                        });
                    } else {
                        this.authSvc.removeCredentials();
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
        window.location.href = `${this.API}/google?redirectUri=${window.location.origin}/callback`
    }

    showPassword(event: boolean): void {
        event ? this.passwordInput.nativeElement.type = "text" : this.passwordInput.nativeElement.type = "password";
    }

    rememberMe(event: boolean): void {
        this.remember = event;
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }
}
