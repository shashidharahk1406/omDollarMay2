import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  id: any;
 
  user_id: any;
  role: any
  pageSize: any=5;
  currentPage: any;

  allTasks:any=[];
  totalPageLength: any;
  searchTask:any

  constructor(private router:Router,private route:ActivatedRoute,private api:ApiService) { 
    this.id=Number(this.route.snapshot.paramMap.get('id'))
    this.user_id=localStorage.getItem('user_id')
    this.role=localStorage.getItem('role')
    console.log(this.id,"idddd")
    
  }

  ngOnInit(): void {
    this.getProjectById();
    this.status();
    
  }


  viewTimeSheet(task_id:any){
    this.router.navigate(['inner/officials/bid-project-management/viewTimesheet/'+ this.id + '/task/' + task_id])
  }

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
  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.api.getProjectByIdSuperAdmin(this.id).subscribe((resp:any)=>{
      this.projectDetails= resp.result.project_data;
      this.allTasks=resp.result.tasks;
      this.totalPageLength=resp.result.pagination.len_of_data
    },(error:any)=>{
      console.log(error);
      
    })}

projectName:any
projectDetails:any=[]
    getProjectById(){
    this.api.getProjectByIdSuperAdmin(this.id).subscribe((resp:any)=>{
      console.log(resp,"dddd")
      this.projectDetails= resp.result.project_data;
      this.allTasks=resp.result.tasks;
      console.log(this.allTasks,"all tasks")
      this.projectName=resp.result.project_data[0].project_name
      console.log(this.projectName,"project name")
      // this.projectName=resp.result.project_data.project_name
      console.log(this.projectDetails,"getbyid")
      // this.totalPageLength=resp.result.pagination.len_of_data
    },(error:any)=>{
      console.log(error);
      
    }
  
    )
  }
  

  viewTask(id:any){
    this.router.navigate(['/inner/officials/bid-project-management/task/' + id])
  }


  allStatus:any=[]
  status(){
    this.api.getStatus().subscribe(
      (resp:any)=>{
        this.allStatus=resp.result.data
        console.log(this.allStatus,"status")
      },
      (error:any)=>{

      }
    )
  }

  statusLabel(data:any){
    const statusLabel= this.allStatus.find((x:any)=> x.id== data)
    return statusLabel?.name
  }
}
