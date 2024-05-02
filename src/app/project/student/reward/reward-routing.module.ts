import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RewardComponent } from './reward.component';
import { ViewRewardComponent } from './view-reward/view-reward.component';

const routes: Routes = [
  {
    path:'', component:RewardComponent
  },
  {
    path:'view/:id', component:ViewRewardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RewardRoutingModule { }
