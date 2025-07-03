import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/core/services/login.service';
import { UserService } from 'src/app/core/services/user.service';
import { repeatPass } from 'src/app/shared/validators/repeatPass.validator'
import { usuario } from 'src/app/core/models/user.interface';

@Component({
    selector: 'app-modify-pass',
    templateUrl: './modify-pass.component.html',
    styleUrls: ['./modify-pass.component.css']
})

export class ModifyPassComponent implements OnInit, OnDestroy {


    private subscripcions: Subscription[] = [];

    modifyPass!: FormGroup;
    usuario!: usuario;
    success: boolean = false;
    error: boolean = false;


    constructor(private readonly fb: FormBuilder, private loginSvc: LoginService, private userSvc: UserService, private router: Router) { }

    ngOnInit(): void {
        this.modifyPass = this.initForm();
        this.subscripcions.push(
            this.loginSvc.readToken().subscribe(res => this.usuario = res)
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
                        this.success = false
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

    ngOnDestroy(): void {
        this.subscripcions.forEach((e) => e.unsubscribe())
    };

}
