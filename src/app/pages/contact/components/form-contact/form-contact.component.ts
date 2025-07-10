import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Email } from 'src/app/core/models/email.interface';
import { EmailService } from 'src/app/core/services/email.service';
interface contactForm {
    name: string,
    select: string,
    message: string,
}

@Component({
    selector: 'app-form-contact',
    templateUrl: './form-contact.component.html',
    styleUrls: ['./form-contact.component.css']
})
export class FormContactComponent implements OnInit, OnDestroy {

    contactForm!: FormGroup;
    success: boolean = false;
    error: boolean = false;

    private subscripcions: Subscription[] = [];

    model: Email = {
        name: '',
        email: '',
        message: ''
    }

    constructor(private readonly fb: FormBuilder ,private emailSvc: EmailService) { }

    ngOnInit(): void {
        this.contactForm = this.initForm();

    }

    public onSubmit(form: Email): void {
        // console.log('formolario validado,',form);
        this.subscripcions.push(

            this.emailSvc.sendEmail(form).subscribe({
                next: (res) => {
                    this.success = true
                    // setTimeout( ()=> this.router.navigate(['login']),1700)
                },
                error: (res) => {
                    this.success = false
                    this.error = true
                }
            })
        )
    };

    initForm(): FormGroup {
        return this.fb.group({
            name: ['',[Validators.required, Validators.minLength(3)]],
            email: ['',[Validators.required, Validators.minLength(3)]],
            message: ['',[Validators.required, Validators.minLength(3)]],
        });
    }

    get nameControl(): FormControl {
        return this.contactForm.get('name') as FormControl;
    }

    get emailControl(): FormControl {
        return this.contactForm.get('email') as FormControl;
    }

    get messageControl(): FormControl {
        return this.contactForm.get('message') as FormControl;
    }



    ngOnDestroy(): void {
        this.subscripcions.forEach((e) => e.unsubscribe())
    }
}
