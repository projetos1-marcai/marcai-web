import { LandingComponent } from './core/layout/landing/landing.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: LandingComponent },
  {
    path: 'providers',
    loadChildren: () =>
      import('./features/providers/providers-routing.module').then((m) => m.ProvidersRoutingModule)
    // canActivate: [AuthGuardService],
  },
  {
    path: 'services',
    loadChildren: () =>
      import('./features/services/services-routing.module').then((m) => m.ServicesRoutingModule)
    // canActivate: [AuthGuardService],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
