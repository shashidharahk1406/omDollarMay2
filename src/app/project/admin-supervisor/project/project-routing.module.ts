import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProjectComponent } from './all-project/all-project.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { ProjectComponent } from './project.component';

const routes: Routes = [
  {
    path:'', component:ProjectComponent, children: [
      {
        path:'create', component: CreateProjectComponent
      },
      {
        path:'view', component: AllProjectComponent
      },
      {
        path:'',redirectTo:'view', pathMatch:'full'
      },
      {
        path:'edit/:id', component: EditProjectComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
