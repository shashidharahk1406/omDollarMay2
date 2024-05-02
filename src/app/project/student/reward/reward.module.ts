import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RewardRoutingModule } from './reward-routing.module';
import { RewardComponent } from './reward.component';
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
import { ViewRewardComponent } from './view-reward/view-reward.component';
@NgModule({
  declarations: [
    RewardComponent,
    ViewRewardComponent
  ],
  imports: [
    CommonModule,
    RewardRoutingModule,
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
    FormsModule,ReactiveFormsModule ,
  ]
})
export class RewardModule { }
