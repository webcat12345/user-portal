import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { HomeComponent } from './home.component';
import { DetailStateModule } from '../shared/detail-state/detail-state.module';
import { UserService } from '../core/services/user.service';
import { users } from '../mock/user.mock';
import { DetailStateService } from '../shared/detail-state/detail-state.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let state: DetailStateService;

  let userServiceSpy: jasmine.SpyObj<UserService>;
  userServiceSpy = jasmine.createSpyObj('UserService', ['getUserById']);
  userServiceSpy.getUserById.and.callFake((id: number) => {
    const found = users.find(u => u.userId === Number(id));
    if (found) {
      return of(found);
    } else {
      return throwError(new HttpErrorResponse({
        error: '404 error',
        status: 404, statusText: 'Not Found'
      }));
    }
  });

  let routerSpy: jasmine.SpyObj<Router>;
  routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  routerSpy.navigate.and.callFake(([path]) => path);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule,
        DetailStateModule.forRoot()
      ],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    state = TestBed.inject(DetailStateService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not process search when form is invalid', () => {

    userServiceSpy.getUserById.calls.reset();

    component.form.get('id')?.setValue('aaa');
    // Id should be number
    expect(component.form.invalid).toBe(true);
    expect(component.form.get('id')?.errors?.['pattern']).toBeTruthy();
    component.search();
    expect(userServiceSpy.getUserById).not.toHaveBeenCalled();

    // When user clears the form, id must be required field
    component.form.get('id')?.setValue('');
    expect(component.form.invalid).toBe(true);
    expect(component.form.get('id')?.errors?.['required']).toBeTruthy();
    component.search();
    expect(userServiceSpy.getUserById).not.toHaveBeenCalled();
  });

  it('should get correct user and navigate to the detail page', fakeAsync(() => {
    component.form.get('id')?.setValue('5');
    component.search();
    tick(100);
    const user = state.getUser();
    expect(user).toEqual(users[4]);
    expect(routerSpy.navigate).toHaveBeenCalledOnceWith(['5']);
  }));

  it('should throw error when id is invalid', fakeAsync(() => {
    component.form.get('id')?.setValue('555');
    fixture.detectChanges();
    try {
      component.search();
      tick();
    } catch (e) {
      expect(e).toEqual(new HttpErrorResponse({
        error: '404 error',
        status: 404, statusText: 'Not Found'
      }));
    }
  }));
});
