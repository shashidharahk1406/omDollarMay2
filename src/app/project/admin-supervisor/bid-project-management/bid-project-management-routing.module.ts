import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BidProjectManagementComponent } from './bid-project-management.component';

import { TaskComponent } from './task/task.component';
import { ViewTimesheetComponent } from './view-timesheet/view-timesheet.component';

const routes: Routes = [
  {
    path:'', component: BidProjectManagementComponent, 
  },
  {
      path:'task/:id', component:TaskComponent
  }
  ,
    {
      path:'viewTimesheet/:project_id/task/:id', component:ViewTimesheetComponent
    }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BidProjectManagementRoutingModule { }
