import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { UserComponent } from 'src/app/components/user/user.component';
import { TableRentalComponent } from 'src/app/components/user/table-rental/table-rental.component';
import { ModifyPassComponent } from 'src/app/components/user/modify-pass/modify-pass.component';
import { RouterModule, Routes } from '@angular/router';
import { PermissionsGuard } from 'src/app/guard/permissions.guard';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/services/interceptor/token.interceptor';


const routes: Routes = [

  {
    path:'',
    component:UserComponent,
    canActivate:[PermissionsGuard],
  },

  {
    path:'modificarContraseña',
    component:ModifyPassComponent,
    canActivate:[PermissionsGuard],
  }
];

@NgModule({
  declarations: [
    UserComponent,
    TableRentalComponent,
    ModifyPassComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatButtonModule

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
