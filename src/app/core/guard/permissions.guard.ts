import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class PermissionsGuard  {
    constructor(private router: Router) { }
    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.hasUser()) {
            return true;
        }
        alert("you don't permissions");
        setTimeout(() => this.router.navigate(['/']), 700);
        return false;
    };

    hasUser(): boolean {
        if (localStorage.getItem('token')) return true;
        else return false;
    };

}
