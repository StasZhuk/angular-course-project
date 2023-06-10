import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { AuthInitialState } from 'src/app/store/reducers/auth.reducer';
import { getUserSelector } from 'src/app/store/selectors/auth.selectors';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const store = inject(Store<{ auth: AuthInitialState }>);

  return store.select(getUserSelector).pipe(
    take(1),
    map((user) => {
      const isAuth = !!user;

      if (!isAuth) {
        return router.createUrlTree(['/auth']);
      }

      return isAuth;
    })
  );
};
