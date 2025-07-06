import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from 'src/app/shared/components/ui/error/error.component';
import { SuccessComponent } from 'src/app/shared/components/ui/success/success.component';
import { MessageErrorComponent } from 'src/app/shared/components/ui/message-error/message-error.component';
import { LoadingComponent } from 'src/app/shared/components/ui/loading/loading.component';
import { StepperComponent } from 'src/app/shared/components/ui/stepper/stepper.component';
import { TableComponent } from './components/ui/table/table.component';
import { RouterModule } from '@angular/router';
import { BtnComponent } from './components/ui/btn/btn.component';
import { MaterialModule } from './material.module';


@NgModule({
    declarations: [
        SuccessComponent,
        ErrorComponent,
        MessageErrorComponent,
        LoadingComponent,
        StepperComponent,
        TableComponent,
        BtnComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule // Assuming you have a MaterialModule for Angular Material components
    ],
    exports: [
        SuccessComponent,
        ErrorComponent,
        MessageErrorComponent,
        LoadingComponent,
        StepperComponent,
        TableComponent,
        RouterModule,
        BtnComponent
    ]
})
export class SharedModule { }
