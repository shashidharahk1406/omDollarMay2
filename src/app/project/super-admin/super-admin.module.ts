import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { SuperAdminComponent } from './super-admin.component';
import { UserListComponent } from './user-list/user-list.component';
import { CreateUserComponent } from './create-user/create-user.component';
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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from 'src/app/shared/shared.module';
import {Country} from '@angular-material-extensions/select-country';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { OverviewComponent } from './overview/overview.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { SataskDetailsComponent } from './satask-details/satask-details.component';

@NgModule({
  declarations: [
    SuperAdminComponent,
    UserListComponent,
    CreateUserComponent,
    OverviewComponent,
    ProjectDetailsComponent,
    SataskDetailsComponent
  ],
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
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
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatFormFieldModule ,
    SharedModule,
    MatSelectCountryModule
  ]
})
export class SuperAdminModule { }
