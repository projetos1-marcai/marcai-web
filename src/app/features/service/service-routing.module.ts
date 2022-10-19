import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';
import { ServiceComponent } from './service.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'create',
    // canActivate: [AuthGuardService],
    component: CreateComponent
  },
  {
    path: ':id',
    // canActivate: [AuthGuardService],
    component: ServiceComponent
  },
  {
    path: ':id/edit',
    // canActivate: [AuthGuardService],
    component: EditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceRoutingModule {}
