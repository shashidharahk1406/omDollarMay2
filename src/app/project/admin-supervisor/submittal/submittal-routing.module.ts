import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubmittalComponent } from './submittal.component';
import { ViewBidderComponent } from './view-bidder/view-bidder.component';

const routes: Routes = [
  {
    path:'', component :SubmittalComponent
  }
  , 
    {
      path:'view-bidders/:id', component:ViewBidderComponent
    }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubmittalRoutingModule { }
