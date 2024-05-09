import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { AllProjectComponent } from './all-project/all-project.component';

import { CreateBidComponent } from './create-bid/create-bid.component';
import { EditBidComponent } from './edit-bid/edit-bid.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import{MatTabsModule}from"@angular/material/tabs";
import { SharedModule } from 'src/app/shared/shared.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    ProjectComponent,
    AllProjectComponent,
   
    CreateBidComponent,
    EditBidComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatTabsModule,
    SharedModule,
    Ng2SearchPipeModule,
    FormsModule,ReactiveFormsModule,
    NgMultiSelectDropDownModule,
  ]
})
export class ProjectModule { }
