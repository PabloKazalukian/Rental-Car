import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/core/services/auth/login.service';
import { UserService } from 'src/app/core/services/user.service';
import { repeatPass } from 'src/app/shared/validators/repeatPass.validator'
import { Usuario } from 'src/app/core/models/user.interface';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
    selector: 'app-modify-pass',
    templateUrl: './modify-pass.component.html',
    styleUrls: ['./modify-pass.component.css']
})

export class ModifyPassComponent implements OnInit, OnDestroy {


    private subscripcions: Subscription[] = [];

    modifyPass!: UntypedFormGroup;
    usuario!: Usuario;
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
                this.userSvc.modifyPass(this.modifyPass.value.password1, this.usuario.sub).subscribe({
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

    initForm(): UntypedFormGroup {
        //declarar las propiedas que tendran nuestro formulario
        return this.fb.group({
            password1: ['', [Validators.required, Validators.minLength(3)]],
            password2: ['', [Validators.required, Validators.minLength(3)]],
        }, {
            validators: repeatPass.dateCorrect
        })
    };

    get password1Control(): UntypedFormControl {
        return this.modifyPass.get('password1') as UntypedFormControl;
    }

    get password2Control(): UntypedFormControl {
        return this.modifyPass.get('password2') as UntypedFormControl;
    }

    ngOnDestroy(): void {
        this.subscripcions.forEach((e) => e.unsubscribe())
    };

}
