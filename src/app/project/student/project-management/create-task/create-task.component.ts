import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  user_id:any;
  id:any;
  minDate:any
  maxDate:any
  error:boolean=false;
  errorAlert:boolean=false;
  isLoading:boolean = false;
  projectCreationDate: any;
  project_id: any;
  minDate1: any;
  constructor(private api:ApiService,private builder:FormBuilder,private router:ActivatedRoute,private route:Router,private datepipe:DatePipe) {
    this.user_id=localStorage.getItem('user_id')
    this.id =this.router.snapshot.paramMap.get('id')
    this.project_id =this.router.snapshot.paramMap.get('id')
    this.getAllProject();
 
   }

  ngOnInit(): void {
  }
  createTaskForm= this.builder.group({
    "task_name":['',Validators.required],
    "description":['',Validators.required],
    "reason":['',Validators.required],
    "project_id":['',Validators.required],
    "task_status":['',Validators.required],
    "rate_id":['1'],
    "user_id": ['',Validators.required],
    // "applied_by_id": ['',Validators.required],
    "start_time":['',Validators.required],
    "end_time":['',Validators.required]
})
  get f(){
    return this.createTaskForm.controls;
  }
  startDateValue:any
  endDateValue:any
  startDate(data:any){
    console.log(data.target.value)
    this.startDateValue=data.target.value
    this.createTaskForm.patchValue({start_time:this.datepipe.transform(this.startDateValue,"yyyy-MM-dd")})
    this.minDate=this.datepipe.transform(this.startDateValue,"yyyy-MM-dd")
  }
  addFromDate(event_from: MatDatepickerInputEvent<Date>) {
    console.log(event_from.value);
    this.startDateValue=event_from.value
    this.createTaskForm.patchValue({start_time:this.datepipe.transform(this.startDateValue,"yyyy-MM-dd")})
    this.minDate=this.datepipe.transform(this.startDateValue,"yyyy-MM-dd")
  }
  addToDate(event_from: MatDatepickerInputEvent<Date>) {
    console.log(event_from.value);
    this.endDateValue=event_from.value
    this.createTaskForm.patchValue({end_time:this.datepipe.transform(this.endDateValue,"yyyy-MM-dd")})
    this.maxDate=this.datepipe.transform(this.endDateValue,"yyyy-MM-dd")
  }
  endDate(data:any){
    console.log(data.target.value)
    this.endDateValue=data.target.value
    this.createTaskForm.patchValue({end_time:this.datepipe.transform(this.endDateValue,"yyyy-MM-dd")})
    this.maxDate=this.datepipe.transform(this.endDateValue,"yyyy-MM-dd")
  }
  create(){


    this.createTaskForm.patchValue({project_id:this.id})
    this.createTaskForm.patchValue({user_id: this.user_id})
    this.createTaskForm.patchValue({task_status: "Pending"})
    if(this.createTaskForm.invalid){
      this.error= true;
    }
    else{
      this.isLoading = true;
      this.createTaskForm.patchValue({end_time:this.datepipe.transform(this.endDateValue,"dd-MM-yyyy")})
      this.createTaskForm.patchValue({start_time:this.datepipe.transform(this.startDateValue,"dd-MM-yyyy")})
      console.log(this.createTaskForm.value);
    
      setTimeout(() => {
        this.api.createTaskByProjectId(this.createTaskForm.value).subscribe(
          (resp:any)=>{
            this.api.showSuccess('Task Created Successfully')
            this.createTaskForm.reset()
            this.goBack();
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
  goBack(){
   
    this.route.navigate(['/inner/student/project-management/task-details/' + this.id])
    
   
  }

isDateDisabled:boolean=false;
  getAllProject(){
    this.api.getProjectId(this.project_id).subscribe(
      (resp:any)=>{
        console.log(resp,"response")
      //  this.project_name=resp.Message[0].project_name
      //  this.estimated_hours=resp.Message[0].estimated_hours;
        this.projectCreationDate=resp.Message[0].created_datetime;
        this.minDate1=this.projectCreationDate;
        console.log(this.projectCreationDate,'pdddddddddddddddddddddddd');
       

     
      },
      (error:any)=>{

      }
    )
  }
}