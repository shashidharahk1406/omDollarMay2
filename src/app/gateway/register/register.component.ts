import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  error:boolean=false;
  errorAlert:boolean=false;
  isLoading = false;
  errorMessage:any
  password:any='password';
  show:boolean = false;
  constructor(private router:Router,private builder:FormBuilder,private api:ApiService) { }

  ngOnInit(): void {
  }
  registerForm=this.builder.group({
    user_name:['',Validators.required],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required]],
    role_id:['3'],///Testing server
    // role_id:['4'],
  })
  get f(){
    return this.registerForm.controls;
  }

  register(){
    if(this.registerForm.invalid){
      this.error= true;
    }
    else{
      this.isLoading = true;
      setTimeout(() => {
        this.api.register(this.registerForm.value).subscribe(
          (resp:any)=>{
            this.isLoading = false;
            this.errorAlert=false;
            this.api.showSuccess('Registration Successfull')
            localStorage.setItem('role','Volunteer')
            this.router.navigate(['outer'])  
          },
          (error:any)=>{
            console.log(error);
            if(error.error.error.detail=="User already registered with this email"){
              this.isLoading = false;
              this.errorAlert=true;
              this.errorMessage="Email already registered"
            }
            else{
              this.isLoading = false;
              this.errorAlert=true;
              this.errorMessage="Error"
            }
          
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
