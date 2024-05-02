import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RateCardRoutingModule } from './rate-card-routing.module';
import { RateCardComponent } from './rate-card.component';
import { CreateRateCardComponent } from './create-rate-card/create-rate-card.component';
import { AllRateCardComponent } from './all-rate-card/all-rate-card.component';
import { EditRateCardComponent } from './edit-rate-card/edit-rate-card.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RateCardComponent,
    CreateRateCardComponent,
    AllRateCardComponent,
    EditRateCardComponent
  ],
  imports: [
    CommonModule,
    RateCardRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RateCardModule { }
