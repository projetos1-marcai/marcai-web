import { ServiceComponent } from './service/service.component';
import { ServicesComponent } from './services.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuardService],
    component: ServicesComponent
  },
  {
    path: ':id',
    // canActivate: [AuthGuardService],
    component: ServiceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule {}
