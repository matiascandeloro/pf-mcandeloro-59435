import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService= inject(AuthService);
  const router= inject(Router);
  return authService.verifyToken().pipe(map((isValid)=>{
    return !!isValid?true:router.createUrlTree(['auth','login']);
  }));
};
