import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-create-bid',
  templateUrl: './create-bid.component.html',
  styleUrls: ['./create-bid.component.css']
})
export class CreateBidComponent implements OnInit {
  projectSetting = {};
  allProject:any=[]
  projectId:any
  user_id:any ;
  error:boolean=false;
  errorAlert:boolean=false;
  isLoading:boolean = false;
  constructor(private api:ApiService,private builder:FormBuilder,private route:Router) {
    this.user_id=localStorage.getItem('user_id')
   }

  ngOnInit(): void {
    this.project()
  }
  createProjectBidForm= this.builder.group({
    "description":['',Validators.required],
    "project_id" :['',Validators.required],
    "user_id" :['',Validators.required],
    "status_in":['',Validators.required],

  })
  get f(){
    return this.createProjectBidForm.controls;
  }
  project(){
    this.projectSetting = {
      singleSelection: true,
      id: 'id',
      textField: 'project_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    
    this.api.getActiveProject(this.user_id).subscribe(
      (resp:any)=>{
       this.allProject=resp.result.data.filter((x:any) => x.project_status_id==1)
      },
      (error:any)=>{

      }
    )
  }
  onProjectSelect(event: any) {
    this.projectId = event.id   
    
  }
  onItemDeselect(event:any){
    this.projectId=undefined
  }
  create(){
    this.createProjectBidForm.patchValue({project_id:this.projectId}) 
    this.createProjectBidForm.patchValue({status_in:"Bidding_Stage"})
    this.createProjectBidForm.patchValue({user_id:Number(localStorage.getItem('user_id'))})
    if(this.createProjectBidForm.invalid){
      this.error= true;
    }
    else{
      this.isLoading = true;
      
      setTimeout(() => {
        this.api.createProjectBid(this.createProjectBidForm.value).subscribe(
          (resp:any)=>{
            this.api.showSuccess('Bid Created Successfully')
            this.createProjectBidForm.reset();
            this.route.navigate(['/inner/officials/bid/view'])
            this.ngOnInit()
            // window.location.reload()
            this.isLoading = false;
          },
          (error:any)=>{
            console.log(error);
            this.isLoading = false;
          }
          )
      }, 2000);
    
    }
 
  }
}
