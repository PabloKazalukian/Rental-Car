import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/core/services/auth/login.service';
import { UserService } from 'src/app/core/services/user.service';
import { repeatPass } from 'src/app/shared/validators/repeatPass.validator'
import { PassDouble } from 'src/app/core/models/user.interface';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FormControlsOf } from '../../../shared/utils/form-types.util';
import { AuthenticatedUser } from 'src/app/core/models/login.interface';

type ModifyPassType = FormControlsOf<PassDouble>

@Component({
    selector: 'app-modify-pass',
    templateUrl: './modify-pass.component.html',
    styleUrls: ['./modify-pass.component.scss']
})

export class ModifyPassComponent implements OnInit, OnDestroy {


    private subscripcions: Subscription[] = [];

    modifyPass!: FormGroup<ModifyPassType>;
    usuario!: AuthenticatedUser;
    loading: boolean = true;
    success: boolean = false;
    error: boolean = false;
    samePass: { show: boolean, msg: string } = { show: false, msg: '' }


    constructor(private readonly fb: UntypedFormBuilder, private authSvc: AuthService, private loginSvc: LoginService, private userSvc: UserService, private router: Router) { }

    ngOnInit(): void {
        this.modifyPass = this.initForm();
        this.subscripcions.push(
            this.authSvc._user$.subscribe({
                next: (res) => {
                    this.usuario = res;
                    this.loading = false;
                },
                error: (err) => {
                    console.log(err);
                    this.error = true;
                    this.success = false;
                }
            })
        );
    };

    onSubmit(): void {
        if (this.usuario.sub !== undefined) {
            this.subscripcions.push(
                this.userSvc.modifyPass(this.modifyPass.get('password1')!.value, this.usuario.sub).subscribe({
                    next: (res) => {
                        this.success = true;
                        setTimeout(() => {
                            this.router.navigate(['/usuario']);
                        }, 2000);
                    },
                    error: (res) => {
                        this.samePass = {
                            show: true,
                            msg: res.message
                        }
                        this.error = true;
                        this.success = false;
                    },
                })
            );
        };
    };

    initForm(): FormGroup<ModifyPassType> {
        //declarar las propiedas que tendran nuestro formulario
        return new FormGroup<ModifyPassType>({
            password1: new FormControl('', {
                nonNullable: true,
                validators: [Validators.required, Validators.minLength(3)]
            }),
            password2: new FormControl('', {
                nonNullable: true,
                validators: [Validators.required, Validators.minLength(3)]
            })
        }, {
            validators: repeatPass.samePassword
        });
    };

    get password1Control(): FormControl<string> {
        return this.modifyPass.get('password1') as FormControl<string>;
    }

    get password2Control(): FormControl<string> {
        return this.modifyPass.get('password2') as FormControl<string>;
    }

    ngOnDestroy(): void {
        this.subscripcions.forEach((e) => e.unsubscribe())
    };

}
