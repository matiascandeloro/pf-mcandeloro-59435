import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authAdminGuard: CanActivateFn = (route, state) => {
  const authService= inject(AuthService);
  const router= inject(Router);
  return authService.isAdmin()?true:router.createUrlTree(['dashboard','home']);
};
