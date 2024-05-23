import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortPipe } from '../pipe/sort/sort.pipe';
import { CustomFilterPipe } from '../pipe/search/search.pipe';
import { MonthSortPipe } from '../pipe/monthSort/month-sort.pipe';
import { SortingConfigModalComponent } from './sorting-config-modal/sorting-config-modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SortPipe,CustomFilterPipe,MonthSortPipe, SortingConfigModalComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    NgMultiSelectDropDownModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    SortPipe,
    CustomFilterPipe,
    MonthSortPipe,
    SortingConfigModalComponent
  ]

})
export class SharedModule { }
