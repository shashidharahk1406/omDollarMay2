import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { ProjectManagementComponent } from './project-management.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { CreateTimesheetComponent } from './create-timesheet/create-timesheet.component';

const routes: Routes = [
  {
    path:'', component: ProjectManagementComponent, 
  },
    {
      path:'task-details/:id', component:TaskDetailsComponent
    },
    {
      path:'edit/:project_id/task/:id', component: EditTaskComponent
    },
    {
      path:'create/:id', component:CreateTaskComponent
    },
    {
      path:'createTimesheet/:project_id/task/:id', component:CreateTimesheetComponent
    }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectManagementRoutingModule { }
