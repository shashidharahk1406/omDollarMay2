import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GatewayRoutingModule } from './gateway-routing.module';
import { GatewayComponent } from './gateway.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { ChangePasswordComponent } from './change-password/change-password.component';


@NgModule({
  declarations: [
    GatewayComponent,
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    GatewayRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgOtpInputModule
  ]
})
export class GatewayModule { }
