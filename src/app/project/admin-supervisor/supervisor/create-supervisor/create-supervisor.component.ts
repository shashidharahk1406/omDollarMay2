import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
@Component({
  selector: 'app-create-supervisor',
  templateUrl: './create-supervisor.component.html',
  styleUrls: ['./create-supervisor.component.css']
})
export class CreateSupervisorComponent implements OnInit {
  user_id:any
  constructor(private api:ApiService,private builder:FormBuilder) { 
    
  }

  error:boolean=false;
  errorAlert:boolean=false;
  isLoading:boolean = false;

  ngOnInit(): void {

  }
  createFaculty= this.builder.group({
    "project_name":['',Validators.required],
    "estimated_hours" :['',Validators.required],
    // "estimation_completion_time" :['',Validators.required],
    "description":['',Validators.required],
    "Skillset":['',Validators.required],
    "outcome_required" :['',Validators.required],
    // "estimated_rate_id":['',Validators.required],
    "terms_and_conditions" :['',Validators.required],
    "project_status_id":['',Validators.required],
    "user_ref_id" :['',Validators.required],
    "budget_amount":['',Validators.required],
    "total_people":['',Validators.required]
  })
  get f(){
    return this.createFaculty.controls;
  }

  create(){
    this.createFaculty.patchValue({project_status_id:2})
    this.createFaculty.patchValue({user_ref_id: Number(localStorage.getItem('user_id'))})
    if(this.createFaculty.invalid){
      this.error= true;
    }
    else{
      this.isLoading = true;

      setTimeout(() => {
        this.api.createProject(this.createFaculty.value).subscribe(
          (resp:any)=>{
            this.createFaculty.reset()
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
