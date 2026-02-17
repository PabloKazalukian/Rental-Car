import { NgModule } from '@angular/core';
import { PermissionsGuard } from './guards/permissions.guard';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true,
        },
        PermissionsGuard,
    ],
})
export class CoreModule {}
