import { ProviderComponent } from './provider/provider.component';
import { ProvidersComponent } from './providers.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuardService],
    component: ProvidersComponent
  },
  {
    path: ':id',
    // canActivate: [AuthGuardService],
    component: ProviderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvidersRoutingModule {}
