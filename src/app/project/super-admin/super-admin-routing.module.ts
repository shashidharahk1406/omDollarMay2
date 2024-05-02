import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperAdminComponent } from './super-admin.component';
import { UserListComponent } from './user-list/user-list.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { OverviewComponent } from './overview/overview.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { SataskDetailsComponent } from './satask-details/satask-details.component';


const routes: Routes = [
  {
    path:'', component: SuperAdminComponent, children:[
      {
        path:'user-list', component:UserListComponent
      },
      {path:'over-view',component:OverviewComponent},
      {
        path:'', redirectTo:'user-list', pathMatch:'full'
      },
      {
        path:"create-user", component:CreateUserComponent
      },{
        path:'project-details/:id',component:ProjectDetailsComponent
      },
      {path:'satask-deatils',component:SataskDetailsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
