import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student.component';

const routes: Routes = [
  {
    path:'', component: StudentComponent, children:[
      {
        path:'project', loadChildren:()=> import('./project/project.module').then(m => m.ProjectModule)
      },
      {
        path:'project-management', loadChildren:()=> import ('./project-management/project-management.module').then(m =>m.ProjectManagementModule)
      },
      {
        path:'reward', loadChildren:()=> import ('./reward/reward.module').then(m => m.RewardModule)
      }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
