import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';

import { DetailStateService } from './detail-state.service';
import { UserService } from '../../core/services/user.service';

@Injectable()
export class DetailResolverGuard implements CanActivate {

  constructor(
    private router: Router,
    private detailStateService: DetailStateService,
    private userService: UserService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.detailStateService.getUser()) {
      return true;
    } else {
      return this.userService.getUserById(route.params['id']).pipe(
        map(user => {
          this.detailStateService.setUser(user);
          return true;
        }),
        catchError(err => {
          this.router.navigate(['/']);
          return of(false);
        })
      );
    }
  }
}
