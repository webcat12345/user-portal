import { TestBed } from '@angular/core/testing';

import { DetailStateService } from './detail-state.service';

describe('DetailStateService', () => {
  let service: DetailStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
