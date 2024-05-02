import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatusRoutingModule } from './status-routing.module';
import { StatusComponent } from './status.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { CreateStatusComponent } from './create-status/create-status.component';
import { AllStatusComponent } from './all-status/all-status.component';
import { EditStatusComponent } from './edit-status/edit-status.component'
@NgModule({
  declarations: [
    StatusComponent,
    CreateStatusComponent,
    AllStatusComponent,
    EditStatusComponent
  ],
  imports: [
    CommonModule,
    StatusRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule
  ]
})
export class StatusModule { }
