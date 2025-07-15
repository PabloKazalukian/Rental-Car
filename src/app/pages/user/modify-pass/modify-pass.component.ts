import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/core/services/auth/login.service';
import { UserService } from 'src/app/core/services/user.service';
import { repeatPass } from 'src/app/shared/validators/repeatPass.validator'
import { Usuario } from 'src/app/core/models/user.interface';

@Component({
    selector: 'app-modify-pass',
    templateUrl: './modify-pass.component.html',
    styleUrls: ['./modify-pass.component.css']
})

export class ModifyPassComponent implements OnInit, OnDestroy {


    private subscripcions: Subscription[] = [];

    modifyPass!: FormGroup;
    usuario!: Usuario;
    loading: boolean = true;
    success: boolean = false;
    error: boolean = false;
    samePass: { show: boolean, msg: string } = { show: false, msg: '' }


    constructor(private readonly fb: FormBuilder, private loginSvc: LoginService, private userSvc: UserService, private router: Router) { }

    ngOnInit(): void {
        this.modifyPass = this.initForm();
        this.subscripcions.push(
            this.loginSvc.readToken().subscribe({
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
                            msg: res
                        }
                        this.error = true;
                        this.success = false;
                    },
                })
            );
        };
    };

    initForm(): FormGroup {
        //declarar las propiedas que tendran nuestro formulario
        return this.fb.group({
            password1: ['', [Validators.required, Validators.minLength(3)]],
            password2: ['', [Validators.required, Validators.minLength(3)]],
        }, {
            validators: repeatPass.dateCorrect
        })
    };

    get password1Control(): FormControl {
        return this.modifyPass.get('password1') as FormControl;
    }

    get password2Control(): FormControl {
        return this.modifyPass.get('password2') as FormControl;
    }

    ngOnDestroy(): void {
        this.subscripcions.forEach((e) => e.unsubscribe())
    };

}
