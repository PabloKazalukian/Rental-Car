import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from 'src/app/components/shared/error/error.component';
import { SuccessComponent } from 'src/app/components/shared/success/success.component';
import { MessageErrorComponent } from 'src/app/components/shared/message-error/message-error.component';



@NgModule({
    declarations: [
        SuccessComponent,
        ErrorComponent,
        MessageErrorComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        SuccessComponent,
        ErrorComponent,
        MessageErrorComponent
    ]
})
export class SharedModule { }
