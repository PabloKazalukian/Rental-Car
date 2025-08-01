import { Injectable } from '@angular/core';
import { decrypt, encrypt } from 'src/app/shared/utils/encryption.util';
import { LoginWithCredentials } from '../../models/login.interface';

@Injectable({
    providedIn: 'root'
})
export class CredentialsService {

    constructor() { }

    getCredentials(): LoginWithCredentials {
        const remember = localStorage.getItem('remember') === 'true';
        const usernameEncrypted = localStorage.getItem('identifier');
        const passwordEncrypted = localStorage.getItem('password');
        return {
            remember,
            identifier: usernameEncrypted ? decrypt(usernameEncrypted) : '',
            password: passwordEncrypted ? decrypt(passwordEncrypted) : '',
        };
    }

    saveCredentials(credentials: LoginWithCredentials): void {
        localStorage.setItem('remember', credentials.remember ? 'true' : 'false');
        localStorage.setItem('identifier', encrypt(credentials.identifier));
        localStorage.setItem('password', encrypt(credentials.password));
    }

    removeCredentials(): void {
        localStorage.setItem('remember', 'false');
        localStorage.removeItem('identifier');
        localStorage.removeItem('password');
    }
}
