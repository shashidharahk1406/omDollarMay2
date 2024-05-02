import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  role:any=''
  otpNumber:any;
  error:boolean=false;
  errorAlert:boolean=false;
  isLoading = false;
  password:any;
  errorMessage:any;
  show:boolean = false;
  otpHide:boolean=false;
  email:any
  constructor(private router:Router,private builder:FormBuilder,private api:ApiService) {
        this.email=localStorage.getItem('email')
        this.newPasswordForm.patchValue({email:this.email})
   }

  ngOnInit(): void {
    this.password = 'password';
  }
  newPasswordForm=this.builder.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required]],

  })
  get f(){
    return this.newPasswordForm.controls;
  }


  forgetPassword(){
    if(this.newPasswordForm.invalid){
      this.error= true;
    }
    else{
      this.isLoading = true;
      setTimeout(() => {
        this.api.changePassword(this.newPasswordForm.value).subscribe(
          (resp:any)=>{
            this.isLoading = false;
            this.errorAlert=false;
            this.api.showSuccess('Password Changed Successfully')
            this.router.navigate(['outer/login']) 
          },
          (error:any)=>{
            this.isLoading = false;
            this.errorAlert=true
            this.errorMessage= error.error.error.message
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
