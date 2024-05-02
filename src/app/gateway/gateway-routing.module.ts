import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GatewayComponent } from './gateway.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  {
    path:'', component: GatewayComponent, children:[
      {
        path:'', redirectTo:'login', pathMatch:'full'
      },
      {
        path:'login', component:LoginComponent
      },
      {
        path:'register', component:RegisterComponent
      },
      {
        path:'forgot-password', component:ForgetPasswordComponent
      },
      {
        path:'change-password', component:ChangePasswordComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GatewayRoutingModule { }
