import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../Services/s-login';

export const adminGuard: CanActivateFn = () => {
    const loginService = inject(LoginService);
    const router = inject(Router);

    if (loginService.isRegistered() && loginService.isAdmin()) {
        return true;
    } else {
        // Si no es admin, lo mandamos a inicio normal
        router.navigate(['/inicio']);
        return false;
    }
};
