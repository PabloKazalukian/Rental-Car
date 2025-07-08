import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RentalComponent } from 'src/app/pages/rental/rental.component';
import { FormReactivoComponent } from 'src/app/pages/rental/components/form/form-reactivo.component';
import { CalendarComponent } from 'src/app/pages/rental/components/calendar/calendar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PermissionsGuard } from 'src/app/core/guard/permissions.guard';
import { DataResolverService } from 'src/app/core/resolvers/data.resolver.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { DialogConfirmationComponent } from 'src/app/pages/rental/components/dialog-confirmation/dialog-confirmation.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
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
