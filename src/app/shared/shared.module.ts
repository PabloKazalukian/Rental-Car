import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from 'src/app/shared/components/ui/error/error.component';
import { SuccessComponent } from 'src/app/shared/components/ui/success/success.component';
import { MessageErrorComponent } from 'src/app/shared/components/ui/message-error/message-error.component';
import { LoadingComponent } from 'src/app/shared/components/ui/loading/loading.component';
import { StepperComponent } from 'src/app/shared/components/ui/stepper/stepper.component';


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
