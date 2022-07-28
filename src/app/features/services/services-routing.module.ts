import { EditComponent } from './service/edit/edit.component';
import { CreateComponent } from './service/create/create.component';
import { AgendaComponent } from './service/agenda/agenda.component';
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
  },
  {
    path: ':id/agenda',
    // canActivate: [AuthGuardService],
    component: AgendaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule {}
