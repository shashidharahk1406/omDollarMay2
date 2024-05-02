import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BidRoutingModule } from './bid-routing.module';
import { BidComponent } from './bid.component';
import { CreateBidComponent } from './create-bid/create-bid.component';
import { AllBidComponent } from './all-bid/all-bid.component';
import { EditBidComponent } from './edit-bid/edit-bid.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatSortModule } from '@angular/material/sort';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    BidComponent,
    CreateBidComponent,
    AllBidComponent,
    EditBidComponent
  ],
  imports: [
    CommonModule,
    BidRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    MatSortModule,
    Ng2SearchPipeModule,
    SharedModule
  ]
})
export class BidModule { }
