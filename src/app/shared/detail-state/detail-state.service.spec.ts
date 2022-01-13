import { TestBed } from '@angular/core/testing';

import { DetailStateService } from './detail-state.service';
import { DetailStateModule } from './detail-state.module';

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
});
