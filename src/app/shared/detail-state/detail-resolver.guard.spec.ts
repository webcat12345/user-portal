import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { DetailResolverGuard } from './detail-resolver.guard';
import { DetailStateModule } from './detail-state.module';

describe('DetailResolverGuard', () => {
  let guard: DetailResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DetailStateModule.forRoot(),
        RouterTestingModule,
        HttpClientModule
      ]
    });
    guard = TestBed.inject(DetailResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
