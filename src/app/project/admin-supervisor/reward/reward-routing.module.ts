import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RewardComponent } from './reward.component';
import { CreateRewardComponent } from './create-reward/create-reward.component';
import { RewardHistoryComponent } from './reward-history/reward-history.component';
import { TaskRewardHistoryComponent } from './task-reward-history/task-reward-history.component';

const routes: Routes = [
  {
    path:'', component:RewardComponent
  },
  {
    path:'create/:id', component:CreateRewardComponent
  },
  {
    path:'view', component:RewardHistoryComponent
  },
  {
    path:'viewProjectReward/:id', component:TaskRewardHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RewardRoutingModule { }
