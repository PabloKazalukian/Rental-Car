import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RentalComponent } from 'src/app/pages/rental/rental.component';
import { FormReactivoComponent } from 'src/app/pages/rental/components/form/form-reactivo.component';
import { CalendarComponent } from 'src/app/pages/rental/components/calendar/calendar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { DialogConfirmationComponent } from 'src/app/pages/rental/components/dialog-confirmation/dialog-confirmation.component';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { SharedModule } from 'src/app/shared/shared.module';


const routes: Routes = [
    {
        path: '',
        component: RentalComponent,
        // canActivate:[PermissionsGuard],
        // // canDeactivate:[WithoutSaveGuard],
        // resolve:{car:DataResolverService}
    }];

@NgModule({
    declarations: [
        RentalComponent,
        FormReactivoComponent,
        CalendarComponent,
        DialogConfirmationComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        SharedModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatNativeDateModule,
        MatDialogModule,
        MatInputModule,
    ]
})
export class RentalModule { }
