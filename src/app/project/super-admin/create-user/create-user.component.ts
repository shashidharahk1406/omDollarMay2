import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
// import {Country} from '@angular-material-extensions/select-country';
import {Country} from '@angular-material-extensions/select-country';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  user_id:any
  
  formBuilder: any;
  
  constructor(private api:ApiService,private builder:FormBuilder,private route:Router) { 
  //  this.angulartics2GoogleAnalytics.startTracking();
  }


  

  roleSetting = {};
  allRole:any=[]
  roleId:any


  error:boolean=false;
  errorAlert:boolean=false;
  isLoading:boolean = false;
  allCountries:any=[]

  ngOnInit(): void {

    this.role()
    this.getCountry();


   
  }


  
  createUserForm= this.builder.group({
    "user_name":['',Validators.required],
    "email":['',[Validators.required,Validators.email]],
    "password":['',Validators.required],
    "role_id" :['',Validators.required],
    "name_of_organisation":['',Validators.required],
    "address_of_organisation":['',Validators.required]
  })
  get f(){
    return this.createUserForm.controls;
  }

  onKeyDown(event: KeyboardEvent) {
    // Allow only numbers and certain control keys (e.g., backspace, delete, arrow keys)
    if (
      (event.keyCode < 48 || event.keyCode > 57) && // Numbers 0 to 9
      ![8, 46, 37, 39].includes(event.keyCode) // Backspace, Delete, Left Arrow, Right Arrow
    ) {
      event.preventDefault();
    }
  }
  onWheel(event: WheelEvent) {
    event.preventDefault();
  }
  role(){
    this.roleSetting = {
      singleSelection: true,
      id: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.api.getRoleId().subscribe(
      (resp:any)=>{
        this.allRole=resp.result.data
      },
      (error:any)=>{

      }
    )
  }
  onRoleSelect(event: any) {
    this.roleId = event.id
  }


  create(){
    this.createUserForm.patchValue({role_id:this.roleId})
    console.log(this.createUserForm.invalid);
    
    if(this.createUserForm.invalid){
      this.error= true;
    }
    else{
      this.isLoading = true;

      setTimeout(() => {
        this.api.createUser(this.createUserForm.value).subscribe(
          (resp:any)=>{
            this.api.showSuccess('User Created Successfully')
            console.log(resp);
            this.createUserForm.reset();
            this.route.navigate(['/inner/super-admin/user-list'])
            this.roleId=undefined
            this.isLoading = false;
          },
          (error:any)=>{
            console.log(error);
            if(error.error.error == "email Already Exists"){
              this.api.showError('Email Already Exists!')
            }
            else{
              this.api.showError('Error!')

            }
            this.isLoading = false;
            this.roleId=undefined

          }
          )
      }, 2000);
    
    }


    
 
  }



  getCountry(){
      this.api.getCountries().subscribe((res:any)=>{
        console.log(res,"countryyyyyyyyyyyyyyyyyyy")
        this.allCountries=res.countries
        ;
        console.log(this.allCountries,"countryyyyyyyyyyyyyyyyyyy")
      })
  }
 

}
