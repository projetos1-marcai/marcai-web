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
    path: 'service',
    loadChildren: () =>
      import('./features/service/service-routing.module').then((m) => m.ServiceRoutingModule)
    // canActivate: [AuthGuardService],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
