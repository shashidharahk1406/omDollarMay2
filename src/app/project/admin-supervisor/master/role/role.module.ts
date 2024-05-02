import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { RoleComponent } from './role.component';
import { CreateRoleComponent } from './create-role/create-role.component';
import { AllRoleComponent } from './all-role/all-role.component';
import { EditRoleComponent } from './edit-role/edit-role.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    RoleComponent,
    CreateRoleComponent,
    AllRoleComponent,
    EditRoleComponent
  ],
  imports: [
    CommonModule,
    RoleRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule
  ]
})
export class RoleModule { }
