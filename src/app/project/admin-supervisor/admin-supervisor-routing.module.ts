import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminSupervisorComponent } from './admin-supervisor.component';

const routes: Routes = [
  {
    path:'', component:AdminSupervisorComponent, children: [
      {
        path:'project', loadChildren:()=> import('./project/project.module').then( m => m.ProjectModule)
      },
      {
        path:'supervisor', loadChildren:()=> import('./supervisor/supervisor.module').then(m => m.SupervisorModule)
      },
      {
        path:'bid', loadChildren:()=> import('./bid/bid.module').then(m => m.BidModule)
      },
      {
        path:'submittal', loadChildren:()=> import('./submittal/submittal.module').then(m => m.SubmittalModule)
      },
      {
        path:'bid-project-management', loadChildren:()=> import('./bid-project-management/bid-project-management.module').then(m=>m.BidProjectManagementModule)
      },
      {
        path:'reward', loadChildren:()=> import('./reward/reward.module').then(m => m.RewardModule)
      },
      {
        path:'master', loadChildren:()=> import('./master/master.module').then(m=>m.MasterModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminSupervisorRoutingModule { }
