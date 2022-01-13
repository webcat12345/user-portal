import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { catchError, of, throwError } from 'rxjs';

import { UserService } from './user.service';
import { users } from '../../mock/user.mock';

describe('UserService', () => {
  let service: UserService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(UserService);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new UserService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return users when called', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(users));
    service.getUsers().pipe(
      catchError(err => {
        done.fail('api should success');
        throw err;
      })
    ).subscribe(response => {
      expect(response).toEqual(users);
      done();
    });
    expect(httpClientSpy.get.calls.count()).toBe(1);
  });

  it('should return user when called', (done: DoneFn) => {
    const userId = 5;

    httpClientSpy.get.and.returnValue(of(users.find(user => user.userId === userId)));

    service.getUserById(userId).pipe(
      catchError(err => {
        done.fail('user should be there');
        throw err;
      })
    ).subscribe(response => {
      expect(response).toEqual(users[4]);
      done();
    });
    expect(httpClientSpy.get.calls.count()).toBe(1);
  });

  it('should return an error when the user not found', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: '404 error',
      status: 404, statusText: 'Not Found'
    });
    httpClientSpy.get.and.returnValue(throwError(errorResponse));
    service.getUserById(125).pipe(
      catchError(err => {
        expect(err.message).toContain('404 Not Found');
        done();
        return of(err);
      })
    ).subscribe(() => done());
  });
});
