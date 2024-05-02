import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortPipe } from '../pipe/sort/sort.pipe';
import { CustomFilterPipe } from '../pipe/search/search.pipe';
import { MonthSortPipe } from '../pipe/monthSort/month-sort.pipe';



@NgModule({
  declarations: [SortPipe,CustomFilterPipe,MonthSortPipe],
  imports: [
    CommonModule
  ],
  exports:[
    SortPipe,
    CustomFilterPipe,
    MonthSortPipe
  ]

})
export class SharedModule { }
