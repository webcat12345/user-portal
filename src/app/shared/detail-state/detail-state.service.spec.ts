import { TestBed } from '@angular/core/testing';

import { DetailStateService } from './detail-state.service';
import { DetailStateModule } from './detail-state.module';
import { users } from '../../mock/user.mock';

describe('DetailStateService', () => {
  let service: DetailStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DetailStateModule.forRoot()
      ]
    });
    service = TestBed.inject(DetailStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return null when user is not set', () => {
    const response = service.getUser();
    expect(response).toBe(null);
  });

  it('should set user once it is set', () => {
    service.setUser(users[0]);
    const user = service.getUser();
    expect(user).toEqual(users[0]);
  });
});
