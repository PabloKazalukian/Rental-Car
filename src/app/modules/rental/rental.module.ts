import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AlquilerComponent } from 'src/app/components/alquiler/alquiler.component';
import { FormReactivoComponent } from 'src/app/components/alquiler/form-reactivo/form-reactivo.component';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { CalendarComponent } from 'src/app/components/alquiler/form-reactivo/calendar/calendar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PermissionsGuard } from 'src/app/guard/permissions.guard';
import { DataResolverService } from 'src/app/resolvers/data.resolver.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { DialogConfirmationComponent } from 'src/app/components/alquiler/form-reactivo/dialog-confirmation/dialog-confirmation.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../shared/shared.module';


const routes: Routes = [
    {
        path: '',
        component: AlquilerComponent,
        // canActivate:[PermissionsGuard],
        // // canDeactivate:[WithoutSaveGuard],
        // resolve:{car:DataResolverService}
    }];

@NgModule({
    declarations: [
        AlquilerComponent,
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
        MatInputModule
    ]
})
export class RentalModule { }
