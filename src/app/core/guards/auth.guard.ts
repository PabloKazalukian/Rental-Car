import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
    const authSvc = inject(AuthService);
    const router = inject(Router);

    return authSvc.checkCookie().pipe(
        map((isLoggedIn) => {
            if (!isLoggedIn) {
                router.navigate(['/auth/login']);
                return false;
            }
            return true;
        }),
    );
};
