import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ContactMessage } from 'src/app/core/models/email.interface';
import { EmailService } from 'src/app/core/services/email.service';
import { FormControlsOf } from 'src/app/shared/utils/form-types.util';
import { MessageErrorComponent } from '../../../../shared/components/ui/message-error/message-error.component';
import { SuccessComponent } from '../../../../shared/components/ui/success/success.component';
import { BtnComponent } from '../../../../shared/components/ui/btn/btn.component';
import { TaxtareaComponent } from '../../../../shared/components/ui/textarea/textarea.component';
import { FormInputComponent } from '../../../../shared/components/ui/input/input.component';

type ContactFormType = FormControlsOf<ContactMessage>;

@Component({
    selector: 'app-form-contact',
    templateUrl: './form-contact.component.html',
    styleUrls: ['./form-contact.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, FormInputComponent, TaxtareaComponent, BtnComponent, SuccessComponent, MessageErrorComponent]
})

export class FormContactComponent implements OnInit, OnDestroy {

    contactForm!: FormGroup<ContactFormType>;
    success: boolean = false;
    error: boolean = false;

    private subscripcions: Subscription[] = [];

    constructor(private emailSvc: EmailService) { }

    ngOnInit(): void {
        this.contactForm = this.initForm();

    }

    onSubmit(): void {
        this.subscripcions.push(

            this.emailSvc.sendEmail(this.contactForm.getRawValue()).subscribe({
                next: (res) => {
                    this.success = true
                },
                error: (res) => {
                    this.success = false
                    this.error = true
                }
            })
        )
    };

    initForm(): FormGroup<ContactFormType> {
        return new FormGroup<ContactFormType>({
            name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
            email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
            message: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
        });
    }

    get nameControl(): FormControl<string> {
        return this.contactForm.get('name') as FormControl<string>;
    }

    get emailControl(): FormControl<string> {
        return this.contactForm.get('email') as FormControl<string>;
    }

    get messageControl(): FormControl<string> {
        return this.contactForm.get('message') as FormControl<string>;
    }

    ngOnDestroy(): void {
        this.subscripcions.forEach((e) => e.unsubscribe())
    }
}
