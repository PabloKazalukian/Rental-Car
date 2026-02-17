import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginWithCredentials } from 'src/app/core/models/login.interface';
import { CredentialsService } from 'src/app/core/services/auth/credential.service';
import { LoginService } from 'src/app/core/services/auth/login.service';
import { FormControlsOf } from 'src/app/shared/utils/form-types.util';
import { environment } from 'src/environments/environment';
import { MessageErrorComponent } from '../../../shared/components/ui/message-error/message-error.component';
import { SuccessComponent } from '../../../shared/components/ui/success/success.component';
import { LoadingComponent } from '../../../shared/components/ui/loading/loading.component';
import { BtnComponent } from '../../../shared/components/ui/btn/btn.component';
import { TextLinkComponent } from '../../../shared/components/ui/text-link/text-link.component';
import { CheckboxComponent } from '../../../shared/components/ui/checkbox/checkbox.component';
import { FormInputComponent } from '../../../shared/components/ui/input/input.component';
import { AuthComponent } from '../../../shared/components/layout/auth/auth.component';


type LoginFormType = FormControlsOf<LoginWithCredentials>;


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [
        AuthComponent,
        ReactiveFormsModule,
        FormInputComponent,
        CheckboxComponent,
        TextLinkComponent,
        RouterLink,
        BtnComponent,
        LoadingComponent,
        SuccessComponent,
        MessageErrorComponent,
    ],
})

export class LoginComponent implements OnInit, OnDestroy {

    contactForm!: FormGroup<LoginFormType>;
    login!: boolean | null;
    loading: boolean = false;
    private subscriptions: Subscription[] = [];
    showPas: boolean = false;
    @ViewChild('MyRef') passwordInput!: ElementRef;

    private readonly API = `${environment.api}/auth`;


    constructor(private loginSvc: LoginService, private credentialsSvc: CredentialsService, private router: Router) { }

    ngOnInit(): void {
        const credentials = this.credentialsSvc.getCredentials();
        this.contactForm = this.initForm();

        if (credentials.remember) {
            this.contactForm.patchValue({
                identifier: credentials.identifier ?? '',
                password: credentials.password ?? '',
                remember: credentials.remember
            });
        }
    };

    initForm(): FormGroup<LoginFormType> {
        return new FormGroup<LoginFormType>({
            identifier: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
            password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
            remember: new FormControl(false, { nonNullable: true })
        });
    };

    onSubmit(): void {
        this.loading = true;
        this.login = null;

        this.subscriptions.push(
            this.loginSvc.login({
                identifier: this.contactForm.get('identifier')?.value ?? '',
                password: this.contactForm.get('password')?.value ?? '',
            }).subscribe({
                next: (res) => {
                    if (this.contactForm.get('remember')?.value) {
                        this.credentialsSvc.saveCredentials({
                            remember: this.contactForm.get('remember')?.value ?? false,
                            identifier: this.contactForm.get('identifier')?.value ?? '',
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
    };

    loginWithGoogle() {
        this.loading = true;
        window.location.href = `${this.API}/google?redirectUri=${window.location.origin}/auth/callback`;
    }

    showPassword(event: boolean): void {
        event ? this.passwordInput.nativeElement.type = "text" : this.passwordInput.nativeElement.type = "password";
    }

    get identifierControl(): FormControl<string> {
        return this.contactForm.get('identifier')! as FormControl<string>;
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
