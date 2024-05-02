import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  user_id:any;
  project_id:any;
  id:any;
  startDate:any;
  endDate:any;
  minDate:any
  maxDate:any
  error:boolean=false;
  errorAlert:boolean=false;
  isLoading:boolean = false;
  constructor( private datepipe: DatePipe,private api:ApiService,private builder:FormBuilder,private router:ActivatedRoute,private route:Router) {
    this.user_id=localStorage.getItem('user_id')
    this.id =this.router.snapshot.paramMap.get('id')
    this.project_id= this.router.snapshot.paramMap.get('project_id')
   }

  ngOnInit(): void {
    this.getDetails()
  }
  createTaskForm= this.builder.group({
    "id":['',Validators.required],
    "task_name":['',Validators.required],
    "description":['',Validators.required],
    "reason":['',Validators.required],
    "project_id":['',Validators.required],
    "task_status":['',Validators.required],
    // "rate_id":[''],
    "user_id": [''],
    // "applied_by_id": ['',Validators.required],
    "start_time":['',Validators.required],
    "end_time":['',Validators.required],
    "working_hour_list":[''],
})
  get f(){
    return this.createTaskForm.controls;
  }
  getDetails(){
    this.api.getTaskDetails(this.id).subscribe(
      (resp:any)=>{

        console.log(resp,'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
        const dateParts = resp.data.start_time.split('-');
        const day = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1; // January is 0, so subtract 1
        const year = parseInt(dateParts[2], 10);
        const dateObj = new Date(year, month, day);
        this.startDate = this.datepipe.transform(dateObj, 'yyyy-MM-dd');
        
        const dateParts2 = resp.data.end_time.split('-');
        const day2 = parseInt(dateParts2[0], 10);
        const month2 = parseInt(dateParts2[1], 10) - 1; // January is 0, so subtract 1
        const year2 = parseInt(dateParts2[2], 10);
        const dateObj2 = new Date(year2, month2, day2);
        this.endDate = this.datepipe.transform(dateObj2, 'yyyy-MM-dd');
        this.maxDate= this.datepipe.transform(dateObj2, 'yyyy-MM-dd');
        this.minDate= this.datepipe.transform(dateObj2, 'yyyy-MM-dd')
        this.createTaskForm.patchValue({task_name:resp.data.task_name})
        this.createTaskForm.patchValue({description:resp.data.description})
        this.createTaskForm.patchValue({project_id:resp.data.project_id})
        this.createTaskForm.patchValue({task_status:resp.data.task_status})
        // this.createTaskForm.patchValue({rate_id:resp.data.rate_id})
        this.createTaskForm.patchValue({user_id:resp.data.user_id})
        // this.createTaskForm.patchValue({applied_by_id:resp.data.applied_by_id})
        this.createTaskForm.patchValue({start_time:this.startDate})
        this.createTaskForm.patchValue({end_time: this.endDate})
        this.createTaskForm.patchValue({reason: resp.data.reason})
        this.createTaskForm.patchValue({working_hour_list: resp.data.working_hour_list})
       
      },
      (error:any)=>{

      }
    )
  }
  startDatePick(data:any){
    console.log(data.target.value)
    this.startDate=data.target.value
    this.createTaskForm.patchValue({start_time:this.datepipe.transform(this.startDate,"yyyy-MM-dd")})
    this.minDate=this.datepipe.transform(this.startDate,"yyyy-MM-dd")
  }
  endDatePick(data:any){
    console.log(data.target.value)
    this.endDate=data.target.value
    this.createTaskForm.patchValue({end_time:this.datepipe.transform(this.endDate,"yyyy-MM-dd")})
    this.maxDate=this.datepipe.transform(this.endDate,"yyyy-MM-dd")
  }
  addFromDate(event_from: MatDatepickerInputEvent<Date>) {
    console.log(event_from.value);
    this.startDate=event_from.value
    this.createTaskForm.patchValue({start_time:this.datepipe.transform(this.startDate,"yyyy-MM-dd")})
    this.minDate=this.datepipe.transform(this.startDate,"yyyy-MM-dd")
  }
  addToDate(event_from: MatDatepickerInputEvent<Date>) {
    console.log(event_from.value);
    this.endDate=event_from.value
    this.createTaskForm.patchValue({end_time:this.datepipe.transform(this.endDate,"yyyy-MM-dd")})
    this.maxDate=this.datepipe.transform(this.endDate,"yyyy-MM-dd")
  }
  create(){

    this.createTaskForm.patchValue({id: this.id})
    this.createTaskForm.patchValue({task_status: "Pending"})
    console.log(this.createTaskForm.invalid,this.createTaskForm.value);
    
    if(this.createTaskForm.invalid){
      this.error= true;
    }
    else{
      this.isLoading = true;
      this.createTaskForm.patchValue({end_time:this.datepipe.transform(this.endDate,"dd-MM-yyyy")})
      this.createTaskForm.patchValue({start_time:this.datepipe.transform(this.startDate,"dd-MM-yyyy")})
      setTimeout(() => {
        this.api.updateTaskByProjectId(this.createTaskForm.value).subscribe(
          (resp:any)=>{
            this.api.showSuccess('Task Updated Successfully')
            this.createTaskForm.reset()
            this.route.navigate(['/inner/student/project-management/task-details/' + this.project_id])
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
    this.route.navigate(['/inner/student/project-management/task-details/' + this.project_id])
  }

}
