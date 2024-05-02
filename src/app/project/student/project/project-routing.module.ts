import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProjectComponent } from './all-project/all-project.component';
import { EditBidComponent } from './edit-bid/edit-bid.component';

import { ProjectComponent } from './project.component';
import { ProjectDetailsComponent } from '../../super-admin/project-details/project-details.component';

const routes: Routes = [
  {
    path:'', component: ProjectComponent, children:[
      {
        path:'view', component: AllProjectComponent
      },
      {
        path:'', redirectTo:'view', pathMatch:'full'
      },
      {
        path:'project-details', component: ProjectDetailsComponent
      },
      {
        path:'edit-bid', component:EditBidComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
