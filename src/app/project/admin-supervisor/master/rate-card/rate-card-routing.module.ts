import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RateCardComponent } from './rate-card.component';
import { CreateRateCardComponent } from './create-rate-card/create-rate-card.component';
import { AllRateCardComponent } from './all-rate-card/all-rate-card.component';
import { EditRateCardComponent } from './edit-rate-card/edit-rate-card.component';

const routes: Routes = [
  {
    path:'', component:RateCardComponent, children:[
      {
        path:'create', component:CreateRateCardComponent
      },
      {
        path:'view', component:AllRateCardComponent
      },
      {
        path:'', redirectTo:'view', pathMatch:'full'
      },
      {
        path:'edit/:id', component:EditRateCardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RateCardRoutingModule { }
