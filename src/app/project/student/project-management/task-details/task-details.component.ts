import {Component,OnInit, ViewChild} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  @ViewChild('deleteClose') deleteClose:any;
  pageSize= 5;
  currentPage=1;
  totalPageLength:any;
  project_id:any;
  user_id:any;
  searchTask:any
  allTask:any=[]

  arrow:boolean=false
  directionValue:any='asc'
  sortValue:any='task_name'
  sort(direction:any,value:any){
    if(direction=='desc'){
      this.arrow=true
      this.directionValue= direction
      this.sortValue= value
    }
    else{
      this.arrow=false
      this.directionValue= direction
      this.sortValue= value
    }
  }

  constructor(private api:ApiService,private route:Router,private router:ActivatedRoute) {
    this.project_id =this.router.snapshot.paramMap.get('id')
    this.user_id= localStorage.getItem('user_id')
   }
  ngOnInit(): void {

    this.getAllTask()
    this.getAllProject()
  }
  project_name:any
  estimated_hours:any
  projectCreationDate:any;
  getAllProject(){
    this.api.getProjectId(this.project_id).subscribe(
      (resp:any)=>{
        console.log(resp,"response")
       this.project_name=resp.Message[0].project_name
       this.estimated_hours=resp.Message[0].estimated_hours;
        this.projectCreationDate=resp.Message[0].created_datetime;
        console.log(this.projectCreationDate,'pdddddddddddddddddddddddd')
     
      },
      (error:any)=>{

      }
    )
  }
  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.api.getTaskbyProjectId(this.currentPage+1,this.pageSize,this.project_id,this.user_id).subscribe((resp:any)=>{
      this.allTask= resp.result.data;
      
      
      this.totalPageLength=resp.result.pagination.len_of_data
    },(error:any)=>{
      console.log(error);
      
    })}
    remainingEstimatedHours:any;
    disableCreateTaskButton:boolean=false;
  getAllTask(){
    this.api.getTaskbyProjectId(this.currentPage,this.pageSize,this.project_id,this.user_id).subscribe((resp:any)=>{
      this.allTask= resp.result.data;
      this.remainingEstimatedHours=resp.result.data[0].remaining_task_hours;
      if( this.remainingEstimatedHours===0){
    this.disableCreateTaskButton=true; 
      }
      else{
        this.disableCreateTaskButton=false;
      }
      console.log(  this.remainingEstimatedHours,"resh")
      console.log(this.allTask,"all tasks")
      this.totalPageLength=resp.result.pagination.len_of_data
    },(error:any)=>{
      console.log(error);
      
    }
  
    )
  }

  selectedId:any
  id(id:any){
    this.selectedId =id
  }
  createTimeSheetRoute(){
    this.route.navigate(['inner/student/project-management/createTimesheet/'+ this.project_id + '/task/' + this.selectedId])
  }
  editRoute(){
    this.route.navigate(['inner/student/project-management/edit/'+ this.project_id + '/task/' + this.selectedId])
  }
  delete(){
    this.api.deleteProjectBid(this.selectedId).subscribe((data:any)=>{
      this.ngOnInit();
      this.deleteClose.nativeElement.click();
    },error=>{
      console.log(error);
      
    })
    
  }

  goToCreateTask(){
    this.route.navigate(['/inner/student/project-management/create/' + this.project_id])
  }

}

