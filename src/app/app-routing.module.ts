import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'outer', loadChildren:()=> import('./gateway/gateway.module').then( m => m.GatewayModule)
  },
  {
    path:'inner', loadChildren:()=> import('./project/project.module').then( m => m.ProjectModule)
  },
  {
    path:'', redirectTo:'outer', pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
