import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if (!localStorage.getItem('userLogin')) {
    const route: Router = inject(Router);
    route.navigate(['/']);
    return false;
  }
  return true;
};
