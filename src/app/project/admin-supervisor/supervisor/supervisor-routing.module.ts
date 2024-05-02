import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllSupervisorComponent } from './all-supervisor/all-supervisor.component';
import { CreateSupervisorComponent } from './create-supervisor/create-supervisor.component';
import { EditSupervisorComponent } from './edit-supervisor/edit-supervisor.component';
import { SupervisorComponent } from './supervisor.component';

const routes: Routes = [
  {
    path:'', component: SupervisorComponent, children:[
      {
        path:'create', component: CreateSupervisorComponent
      },
      {
        path:'view', component: AllSupervisorComponent
      },
      {
        path:'',redirectTo:'view', pathMatch:'full'
      },
      {
        path:'edit/:id', component: EditSupervisorComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupervisorRoutingModule { }
