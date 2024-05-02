import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatusComponent } from './status.component';
import { CreateStatusComponent } from './create-status/create-status.component';
import { AllStatusComponent } from './all-status/all-status.component';
import { EditStatusComponent } from './edit-status/edit-status.component';

const routes: Routes = [
  {
    path:'', component:StatusComponent, children:[
      {
        path:'create', component:CreateStatusComponent
      },
      {
        path:'view', component:AllStatusComponent
      },
      {
        path:'', redirectTo:'view', pathMatch:'full'
      },
      {
        path:'edit/:id', component:EditStatusComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatusRoutingModule { }
