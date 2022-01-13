import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DetailStateService } from '../shared/detail-state/detail-state.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailComponent {

  user = this.detailStateService.getUser();

  constructor(
    private detailStateService: DetailStateService
  ) {
  }

}
