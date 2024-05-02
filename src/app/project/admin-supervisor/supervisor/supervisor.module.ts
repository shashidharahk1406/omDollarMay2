import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupervisorRoutingModule } from './supervisor-routing.module';
import { SupervisorComponent } from './supervisor.component';
import { CreateSupervisorComponent } from './create-supervisor/create-supervisor.component';
import { AllSupervisorComponent } from './all-supervisor/all-supervisor.component';
import { EditSupervisorComponent } from './edit-supervisor/edit-supervisor.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SupervisorComponent,
    CreateSupervisorComponent,
    AllSupervisorComponent,
    EditSupervisorComponent
  ],
  imports: [
    CommonModule,
    SupervisorRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,ReactiveFormsModule
  ]
})
export class SupervisorModule { }
