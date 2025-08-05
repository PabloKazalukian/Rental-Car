import { TestBed } from "@angular/core/testing";
import { CredentialsService } from "./credential.service";

describe('CredentialsService', () => {
    let service: CredentialsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CredentialsService],
        });
        service = TestBed.inject(CredentialsService);
        localStorage.clear();
    });

    it('debe guardar las credenciales en localStorage', () => {
        const cred = {
            identifier: 'john@example.com',
            password: 'secret',
            remember: true,
        };

        service.saveCredentials(cred);

        expect(localStorage.getItem('remember')).toBe('true');
        expect(localStorage.getItem('identifier')).toBeDefined();
        expect(localStorage.getItem('password')).toBeDefined();
    });

    it('debe recuperar las credenciales en texto plano', () => {
        const cred = {
            identifier: 'john@example.com',
            password: 'secret',
            remember: true,
        };
        service.saveCredentials(cred);

        const recovered = service.getCredentials();
        expect(recovered.identifier).toBe(cred.identifier);
        expect(recovered.password).toBe(cred.password);
        expect(recovered.remember).toBeTrue();
    });

    it('debe eliminar las credenciales', () => {
        service.removeCredentials();

        expect(localStorage.getItem('remember')).toBe('false');
        expect(localStorage.getItem('identifier')).toBeNull();
        expect(localStorage.getItem('password')).toBeNull();
    });
});
