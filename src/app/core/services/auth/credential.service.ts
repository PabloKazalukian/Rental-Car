import { Injectable } from '@angular/core';
import { decrypt, encrypt } from 'src/app/shared/utils/encryption.util';
import { credentialsUser } from '../../models/user.interface';

@Injectable({
    providedIn: 'root'
})
export class CredentialsService {

    constructor() { }

    getCredentials(): { remember: boolean, username: string | null, password: string | null } {
        const remember = localStorage.getItem('remember') === 'true';
        const usernameEncrypted = localStorage.getItem('username');
        const passwordEncrypted = localStorage.getItem('password');
        return {
            remember,
            username: usernameEncrypted ? decrypt(usernameEncrypted) : null,
            password: passwordEncrypted ? decrypt(passwordEncrypted) : null,
        };
    }

    saveCredentials(credentials: credentialsUser): void {
        localStorage.setItem('remember', credentials.remember ? 'true' : 'false');
        localStorage.setItem('username', encrypt(credentials.username));
        localStorage.setItem('password', encrypt(credentials.password));
    }

    removeCredentials(): void {
        localStorage.setItem('remember', 'false');
        localStorage.removeItem('username');
        localStorage.removeItem('password');
    }
}
