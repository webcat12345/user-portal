import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailStateService } from './detail-state.service';
import { DetailResolverGuard } from './detail-resolver.guard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class DetailStateModule {
  static forRoot(): ModuleWithProviders<DetailStateModule> {
    return {
      ngModule: DetailStateModule,
      providers: [
        DetailStateService,
        DetailResolverGuard,
      ]
    };
  }
}
