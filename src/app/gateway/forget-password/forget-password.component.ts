import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  role:any=''
  otpNumber:any;
  error:boolean=false;
  errorAlert:boolean=false;
  isLoading = false;
  password:any;
  errorMessage:any;
  show:boolean = false;
  otpHide:boolean=false;
  constructor(private router:Router,private builder:FormBuilder,private api:ApiService) { }

  ngOnInit(): void {
    this.password = 'password';
  }
  forgetPasswordForm=this.builder.group({
    email:['',[Validators.required,Validators.email]],
    // password:['',[Validators.required]],

  })
  get f(){
    return this.forgetPasswordForm.controls;
  }
  verifyOtpForm=this.builder.group({
    email:['',[Validators.required,Validators.email]],
    otp:['',[Validators.required]],

  })
  get formOtp(){
    return this.verifyOtpForm.controls;
  }

  forgetPassword(){
    if(this.forgetPasswordForm.invalid){
      this.error= true;
    }
    else{
      this.isLoading = true;
      setTimeout(() => {
        this.api.forgetPassword(this.forgetPasswordForm.value).subscribe(
          (resp:any)=>{
            this.isLoading = false;
            this.errorAlert=false;
            console.log(resp,resp.email);
            
            this.verifyOtpForm.patchValue({email:resp.email})
            localStorage.setItem('email', resp.email)
            this.api.showSuccess('OTP sent to your Email')
            this.otpHide=true
          },
          (error:any)=>{
            console.log(error);
            this.isLoading = false;
            this.errorAlert=true
            this.errorMessage= error.error.error.message
          }
          )
      }, 2000);
    
    }
 
  }
  onOtpChange(event:any){
    this.otpNumber=event
    this.error=false
  }
  verifyOtp(){
    this.verifyOtpForm.patchValue({otp:this.otpNumber})
    if(this.verifyOtpForm.invalid){
      this.error= true;
    }
    else{
      this.isLoading = true;
      setTimeout(() => {
        this.api.verifyOtp(this.verifyOtpForm.value).subscribe(
          (resp:any)=>{
            this.isLoading = false;
            this.errorAlert=false;
            this.api.showSuccess('OTP Verified Successfully')
            this.router.navigate(['outer/change-password']) 
          },
          (error:any)=>{
            console.log(error);
            this.isLoading = false;
            this.errorAlert=true
          }
          )
      }, 2000);
    
    }
 
  }
  onClick() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }

}
