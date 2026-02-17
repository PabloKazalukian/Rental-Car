import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from 'src/app/pages/user/user.component';
import { TableRentalComponent } from 'src/app/pages/user/table-rental/table-rental.component';
import { RouterModule, Routes } from '@angular/router';
import { PermissionsGuard } from 'src/app/core/guards/permissions.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModifyPassComponent } from 'src/app/pages/user/modify-pass/modify-pass.component';
import { TokenInterceptor } from 'src/app/core/interceptors/token.interceptor';
import { ModifyUserComponent } from 'src/app/pages/user/modify-user/modify-user.component';

import { RentalStatusFilterComponent } from './rental-status-filter/rental-status-filter.component';
import { authGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: UserComponent,
        canActivate: [authGuard],
    },

    {
        path: 'modificar-pass',
        component: ModifyPassComponent,
        canActivate: [authGuard],
    },

    {
        path: 'modificar-usuario',
        component: ModifyUserComponent,
        canActivate: [authGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes), CommonModule, ReactiveFormsModule, UserComponent,
    TableRentalComponent,
    ModifyUserComponent,
    ModifyPassComponent,
    RentalStatusFilterComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true,
        },
    ],
})
export class UserModule {}
