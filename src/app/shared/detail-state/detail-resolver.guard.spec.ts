import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, of, throwError } from 'rxjs';

import { DetailResolverGuard } from './detail-resolver.guard';
import { DetailStateModule } from './detail-state.module';
import { DetailStateService } from './detail-state.service';
import { UserService } from '../../core/services/user.service';
import { users } from '../../mock/user.mock';

describe('DetailResolverGuard', () => {
  let guard: DetailResolverGuard;
  let state: DetailStateService;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const userId = 5;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DetailStateModule.forRoot(),
        RouterTestingModule,
        HttpClientModule
      ]
    });
    state = TestBed.inject(DetailStateService);

    userServiceSpy = jasmine.createSpyObj('UserService', ['getUserById']);
    userServiceSpy.getUserById.and.returnValue(of(users[4]));

    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    routerSpy.navigate.and.callFake(([path]) => path);

    guard = new DetailResolverGuard(routerSpy, state, userServiceSpy);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should get user and return true when user state is empty', (done: DoneFn) => {
    guard.canActivate({ params: { id: userId } } as any, null as any).pipe(
      catchError(err => {
        // Error case will be tested only here
        done.fail('user should be fetched');
        throw err;
      })
    ).subscribe(flag => {
      expect(flag).toBe(true);
      expect(state.getUser()).toEqual(users[4]);
      done();
    });
  });

  it('should return true when user state is there and user id is same', (done: DoneFn) => {
    state.setUser(users[4]); // !!! His user id is 5
    const user = state.getUser();
    guard.canActivate({ params: { id: userId } } as any, null as any).subscribe(flag => {
      expect(user?.userId).toBe(5);
      expect(flag).toBe(true);
      done();
    });
  });

  it('should get user again when user state id is not matching', (done: DoneFn) => {
    state.setUser(users[3]); // !!! His user id is 4, mismatching with the parameter
    let user = state.getUser();

    // At the beginning user id should be 4, which is mismatching
    expect(user?.userId).toBe(4);

    guard.canActivate({ params: { id: userId } } as any, null as any).subscribe(flag => {
      // New fetched user id should be 5, and guard should return true
      user = state.getUser();
      expect(user?.userId).toBe(5);
      expect(flag).toBe(true);
      done();
    });
  });

  it('should return false and redirect to the root page when id is invalid', (done: DoneFn) => {
    const invalidId = 15;
    let user = state.getUser();

    // At the beginning user should be null
    expect(user).toBe(null);

    userServiceSpy.getUserById.and.returnValue(throwError(new HttpErrorResponse({
      error: '404 error',
      status: 404, statusText: 'Not Found'
    })));

    guard.canActivate({ params: { id: userId } } as any, null as any).subscribe(flag => {
      let user = state.getUser();
      // User fetch returned 404 error, routing should be blocked and will be navigated to the root path - `/`
      expect(flag).toBe(false);
      expect(user).toBe(null);
      expect(routerSpy.navigate).toHaveBeenCalledOnceWith(['/']);
      done();
    });
  });
});
