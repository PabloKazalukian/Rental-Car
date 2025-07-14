import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription, catchError, map, of, switchMap, tap } from 'rxjs';
import { User, Usuario } from 'src/app/core/models/user.interface';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { LoginService } from 'src/app/core/services/login.service';
import { RegisterService } from 'src/app/core/services/register.service';
import { UserService } from 'src/app/core/services/user.service';
import { mustBeDifferent } from 'src/app/shared/validators/equal.validator';

@Component({
    selector: 'app-modify-user',
    templateUrl: './modify-user.component.html',
    styleUrls: ['./modify-user.component.css'],
})
export class ModifyUserComponent implements OnInit, OnDestroy {
    private subscripcions: Subscription[] = [];

    modifyUser!: FormGroup;
    tokenUser!: Usuario;
    user!: User;
    loading: boolean = true;
    success: boolean = false;
    error: boolean = false;

    constructor(
        private readonly fb: FormBuilder,
        private loginSvc: LoginService,
        private regiterSvc: RegisterService,
        private authSvc: AuthService,
        private userSvc: UserService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.subscripcions.push(
            this.loginSvc.readToken().pipe(
                tap((user: Usuario) => {
                    this.tokenUser = user;
                }),
                map((user) => user.sub),
                switchMap((idUser: string) => {
                    return this.userSvc.findUSerById(idUser)
                })
            ).subscribe({
                next: (res: User) => {
                    this.loading = false;
                    this.user = res;
                    this.modifyUser = this.initForm(res);
                },
                error: (err) => {
                    console.log(err);
                    this.success = false;
                }
            })
        );
    }

    onSubmit(): void {
        if (this.tokenUser.sub !== undefined) {
            this.subscripcions.push(
                this.userSvc.modifyUser(this.modifyUser.value, this.tokenUser.sub).pipe(
                    switchMap((res) => {
                        console.log(res);
                        this.success = true;
                        return this.loginSvc.readToken()
                    }),
                    // switchMap(() => this.loginSvc.readToken()),
                    switchMap((es) => {
                        console.log(es) //errorqui
                        return this.authSvc.refreshCookie(es)
                    })
                ).subscribe({
                    next: (user) => {
                        console.log(user)
                        setTimeout(() => {
                            this.router.navigate(['/usuario']);
                        }, 2000);
                    },
                    error: (res) => {
                        console.log(res)
                        // this.success = false;
                        this.error = true;
                    }
                })
            )
        }
    }

    initForm(user: User): FormGroup {
        //declarar las propiedas que tendran nuestro formulario
        return this.fb.group({
            username: [user.username, [Validators.required, Validators.minLength(3)], this.validateUsername.bind(this)],
            email: [user.email, {
                validators: [Validators.required, Validators.email],
                asyncValidators: [this.validateEmail.bind(this)],
                updateOn: 'blur'
            }]
        }, {
            validators: [mustBeDifferent('username', 'email', user)]
        });
    }

    validateEmail(control: AbstractControl): Observable<ValidationErrors | null> {
        if (control.value !== this.user.email) {
            return this.regiterSvc.verifyEmail(control.value).pipe(
                map((data) => {
                    if (data) {
                        return { emailExist: true };
                    } else {
                        return null;
                    }
                }),
                catchError((error) => {
                    return of(null);
                }),
            );
        } else {
            return of(null)
        }
    }

    validateUsername(control: AbstractControl): Observable<ValidationErrors | null> {
        if (control.value === this.user.username) {
            return of(null)
        } else {

            return this.regiterSvc.verifyUsername(control.value).pipe(
                map((data) => {
                    if (data) {
                        return { usernameExist: true };
                    } else {
                        return null;
                    }
                }),
                catchError((error) => {
                    return of(null);
                }),
            );
        }
    }

    get usernameControl(): FormControl {
        return this.modifyUser.get('username') as FormControl;
    }

    get emailControl(): FormControl {
        return this.modifyUser.get('email') as FormControl;
    }

    ngOnDestroy(): void {
        this.subscripcions.forEach((e) => e.unsubscribe());
    }
}
