import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from 'src/app/components/shared/error/error.component';
import { SuccessComponent } from 'src/app/components/shared/success/success.component';
import { MessageErrorComponent } from 'src/app/components/shared/message-error/message-error.component';
import { LoadingComponent } from 'src/app/components/shared/loading/loading.component';
import { StepperComponent } from 'src/app/components/shared/stepper/stepper.component';


@NgModule({
    declarations: [
        SuccessComponent,
        ErrorComponent,
        MessageErrorComponent,
        LoadingComponent,
        StepperComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        SuccessComponent,
        ErrorComponent,
        MessageErrorComponent,
        LoadingComponent,
        StepperComponent
    ]
})
export class SharedModule { }
