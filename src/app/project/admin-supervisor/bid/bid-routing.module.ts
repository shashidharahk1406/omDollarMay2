import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllBidComponent } from './all-bid/all-bid.component';
import { BidComponent } from './bid.component';
import { CreateBidComponent } from './create-bid/create-bid.component';
import { EditBidComponent } from './edit-bid/edit-bid.component';

const routes: Routes = [
  {
    path:'', component:BidComponent, children: [
      {
        path:'create', component: CreateBidComponent
      },
      {
        path:'view', component: AllBidComponent 
      },
      {
        path:'',redirectTo:'view', pathMatch:'full'
      },
      {
        path:'edit/:id', component: EditBidComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BidRoutingModule { }
