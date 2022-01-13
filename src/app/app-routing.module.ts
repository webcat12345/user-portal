import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';

import { DetailResolverGuard } from './core/guards/detail-resolver.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '', component: LayoutComponent,
    children: [
      {
        path: ':id',
        loadChildren: () => import('./detail/detail.module').then(m => m.DetailModule),
        canActivate: [DetailResolverGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
