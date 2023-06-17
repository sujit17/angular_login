import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if (!localStorage.getItem('userLogin')) {
    route.root;
    return false;
  }
  return true;
};
