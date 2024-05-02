import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleComponent } from './role.component';
import { CreateRoleComponent } from './create-role/create-role.component';
import { AllRoleComponent } from './all-role/all-role.component';
import { EditRoleComponent } from './edit-role/edit-role.component';

const routes: Routes = [
  {
    path:'', component:RoleComponent, children:[
      {
        path:'create', component:CreateRoleComponent
      },
      {
        path:'view', component:AllRoleComponent
      },
      {
        path:'', redirectTo:'view',pathMatch:'full'
      },
      {
        path:'edit/:id', component:EditRoleComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
