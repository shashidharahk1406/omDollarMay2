import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterComponent } from './master.component';

const routes: Routes = [
  {
    path:'', component:MasterComponent
  },
  {
    path:'rate-card', loadChildren:()=> import('./rate-card/rate-card.module').then(m=> m.RateCardModule)
  },
  {
    path:'role', loadChildren:()=> import('./role/role.module').then(m=>m.RoleModule)
  },
  {
    path:'status', loadChildren:()=> import('./status/status.module').then(m=> m.StatusModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
