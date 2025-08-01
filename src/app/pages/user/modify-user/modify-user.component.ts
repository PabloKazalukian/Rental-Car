import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, ValidationErrors, Validators, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription, catchError, delay, finalize, map, of, switchMap, tap } from 'rxjs';
import { AuthenticatedUser } from 'src/app/core/models/login.interface';
import { ModifyUser, User } from 'src/app/core/models/user.interface';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { RegisterService } from 'src/app/core/services/register.service';
import { UserService } from 'src/app/core/services/user.service';
import { FormControlsOf } from 'src/app/shared/utils/form-types.util';
import { mustBeDifferent } from 'src/app/shared/validators/equal.validator';


type ModifyUserType = FormControlsOf<ModifyUser>;

@Component({
    selector: 'app-modify-user',
    templateUrl: './modify-user.component.html',
    styleUrls: ['./modify-user.component.scss'],
})

export class ModifyUserComponent implements OnInit, OnDestroy {
    private subscripcions: Subscription[] = [];

    modifyUser!: FormGroup<ModifyUserType>;
    tokenUser!: AuthenticatedUser;
    user!: User;

    loading: boolean = true;
    success: boolean = false;
    error: boolean = false;

    constructor(
        private regiterSvc: RegisterService,
        private authSvc: AuthService,
        private userSvc: UserService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.subscripcions.push(
            this.authSvc._user$.pipe(
                tap((user: AuthenticatedUser) => {
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
    };

    onSubmit(): void {
        if (this.tokenUser.sub !== undefined) {
            this.loading = true;
            this.subscripcions.push(
                this.userSvc.modifyUser(this.modifyUser.getRawValue(), this.tokenUser.sub)
                    .pipe(
                        delay(500),
                        finalize(() => {
                            this.loading = false; // Siempre lo ejecuta, éxito o error
                        })
                    ).subscribe({
                        next: (user) => {

                            this.success = true;
                            setTimeout(() => {
                                this.router.navigate(['/usuario']);
                            }, 2000);
                        },
                        error: (res) => {
                            this.error = true;
                        }
                    })
            )
        }
    }

    initForm(user: User): FormGroup<ModifyUserType> {

        return new FormGroup<ModifyUserType>({
            username: new FormControl(user.username, {
                nonNullable: true,
                validators: [Validators.required, Validators.minLength(3)],
                asyncValidators: [this.validateUsername.bind(this)]
            }),
            email: new FormControl(user.email, {
                nonNullable: true,
                validators: [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")],
                asyncValidators: [this.validateEmail.bind(this)],
                updateOn: 'blur'
            })
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

    get usernameControl(): FormControl<string> {
        return this.modifyUser.get('username') as FormControl<string>;
    }

    get emailControl(): FormControl<string> {
        return this.modifyUser.get('email') as FormControl<string>;
    }

    ngOnDestroy(): void {
        this.subscripcions.forEach((e) => e.unsubscribe());
    }
}
