import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from 'src/app/pages/user/user.component';
import { TableRentalComponent } from 'src/app/pages/user/table-rental/table-rental.component';
import { RouterModule, Routes } from '@angular/router';
import { PermissionsGuard } from 'src/app/core/guard/permissions.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModifyPassComponent } from 'src/app/pages/user/modify-pass/modify-pass.component';
import { TokenInterceptor } from 'src/app/core/interceptors/token.interceptor';
import { ModifyUserComponent } from 'src/app/pages/user/modify-user/modify-user.component';
import { SharedModule } from '../../shared/shared.module';
import { RentalStatusFilterComponent } from './rental-status-filter/rental-status-filter.component';



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
        RentalStatusFilterComponent,
        // ModifyPassComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        SharedModule,
        ReactiveFormsModule,

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
