import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { UserComponent } from 'src/app/pages/user/user.component';
import { TableRentalComponent } from 'src/app/pages/user/table-rental/table-rental.component';
import { RouterModule, Routes } from '@angular/router';
import { PermissionsGuard } from 'src/app/core/guard/permissions.guard';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModifyPassComponent } from 'src/app/pages/user/modify-pass/modify-pass.component';
import { TokenInterceptor } from 'src/app/core/interceptors/token.interceptor';
import { ModifyUserComponent } from 'src/app/pages/user/modify-user/modify-user.component';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
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
