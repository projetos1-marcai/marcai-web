import { ExploreComponent } from './features/explore/explore.component';
import { LandingComponent } from './core/layout/landing/landing.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './features/profile/profile.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'explore', component: ExploreComponent },
  { path: 'profile', component: ProfileComponent },
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
