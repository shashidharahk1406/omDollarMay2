import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  role:any=''
  error:boolean=false;
  errorAlert:boolean=false;
  isLoading = false;
  password:any;
  show:boolean = false;
  constructor(private router:Router,private builder:FormBuilder,private api:ApiService) { }

  ngOnInit(): void {
    this.password = 'password';
  }
  loginForm=this.builder.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required]],

  })
  get f(){
    return this.loginForm.controls;
  }

  login(){
    if(this.loginForm.invalid){
      this.error= true;
    }
    else{
      this.isLoading = true;
      setTimeout(() => {
        this.api.login(this.loginForm.value).subscribe(
          (resp:any)=>{
            this.isLoading = false;
            this.errorAlert=false;
            localStorage.setItem('role',resp.role)
            localStorage.setItem('user_id',resp.user_id)
            localStorage.setItem('user_name',resp.username)
            this.api.showSuccess('Login Successfull')
            this.router.navigate(['inner'])  
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
