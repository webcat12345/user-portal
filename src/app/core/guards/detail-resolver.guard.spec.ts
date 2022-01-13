import { TestBed } from '@angular/core/testing';

import { DetailResolverGuard } from './detail-resolver.guard';

describe('DetailResolverGuard', () => {
  let guard: DetailResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DetailResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
