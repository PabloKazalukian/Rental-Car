import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { UserComponent } from 'src/app/pages/user/user.component';
import { TableRentalComponent } from 'src/app/pages/user/table-rental/table-rental.component';
import { RouterModule, Routes } from '@angular/router';
import { PermissionsGuard } from 'src/app/core/guard/permissions.guard';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModifyPassComponent } from 'src/app/pages/user/modify-pass/modify-pass.component';
import { TokenInterceptor } from 'src/app/core/interceptors/token.interceptor';
import { ModifyUserComponent } from 'src/app/pages/user/modify-user/modify-user.component';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatSortModule } from '@angular/material/sort';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { SharedModule } from '../../shared/shared.module';



const routes: Routes = [

    {
        path: '',
        component: UserComponent,
        canActivate: [PermissionsGuard],
    },

    {
        path: 'modificar-pass',
        component: ModifyPassComponent,
        canActivate: [PermissionsGuard],
    },

    {
        path: 'modificar-usuario',
        component: ModifyUserComponent,
        canActivate: [PermissionsGuard],
    }

];

@NgModule({
    declarations: [
        UserComponent,
        TableRentalComponent,
        ModifyUserComponent,
        ModifyPassComponent,
        // ModifyPassComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatInputModule,
        MatSortModule,
        MatPaginatorModule,
        MatFormFieldModule,

    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true,
        },
    ],
})
export class UserModule { }
