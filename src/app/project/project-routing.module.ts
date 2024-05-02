import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectComponent } from './project.component';
import { AuthService } from '../services/api/auth/auth.service';



const routes: Routes = [
  {
    path:'', component:ProjectComponent, children:[
      
      {
        path:'', redirectTo:'dashboard', pathMatch:'full',canActivate:[AuthService]
      },
      {
        path:'dashboard', component: DashboardComponent,canActivate:[AuthService]
      },
      {
        path:'profile',loadChildren:()=>import('./profile/profile.module').then(m=>m.ProfileModule),canActivate:[AuthService]
      },
  
      {
        path:'student', loadChildren:()=> import('./student/student.module').then( m => m.StudentModule),canActivate:[AuthService]
      },
      {
        path:'officials', loadChildren:()=> import('./admin-supervisor/admin-supervisor.module').then(m => m.AdminSupervisorModule),canActivate:[AuthService]
      },
      {
        path:'super-admin', loadChildren:()=> import('./super-admin/super-admin.module').then(m=> m.SuperAdminModule),canActivate:[AuthService]
      }


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
