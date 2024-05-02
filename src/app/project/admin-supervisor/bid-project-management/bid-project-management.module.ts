import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BidProjectManagementRoutingModule } from './bid-project-management-routing.module';
import { BidProjectManagementComponent } from './bid-project-management.component';
import { TaskComponent } from './task/task.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { ApprovedTaskComponent } from './approved-task/approved-task.component';
import { RejectedTaskComponent } from './rejected-task/rejected-task.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import{MatTabsModule}from"@angular/material/tabs";
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {MatSortModule} from '@angular/material/sort';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewTimesheetComponent } from './view-timesheet/view-timesheet.component';


@NgModule({
  declarations: [
    BidProjectManagementComponent,
    TaskComponent,
    TaskDetailsComponent,
    ApprovedTaskComponent,
    RejectedTaskComponent,
    ViewTimesheetComponent,

  ],
  imports: [
    CommonModule,
    BidProjectManagementRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    MatSortModule,
    Ng2SearchPipeModule,
    SharedModule
  ]
})
export class BidProjectManagementModule { }
