import {Component,OnInit,ViewChild} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.css']
})
export class ProjectManagementComponent implements OnInit {
  id:any;
  status:any='Approved'
  pageSize= 5;
  currentPage=1;
  totalPageLength:any;
  searchBidManagement:any
  allApprovedProject:any=[]
  role:any
  constructor(private api:ApiService,private route:Router) { 
    this.id=localStorage.getItem('user_id')
    this.role= localStorage.getItem('role')
  }
  ngOnInit(): void {
    this.getproject()
  }
  arrow:boolean=false
  directionValue:any='asc'

  sortValue:any='project__project_name'
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
    this.api.getApprovedProject(this.currentPage+1,this.pageSize,this.id,this.status).subscribe((resp:any)=>{
      this.allApprovedProject= resp.result.data;      
      this.totalPageLength=resp.result.pagination.len_of_data
    },(error:any)=>{
      console.log(error);
      
    })}
    getproject(){
    this.api.getApprovedProject(this.currentPage,this.pageSize,this.id,this.status).subscribe((resp:any)=>{
      this.allApprovedProject= resp.result.data;
      console.log( this.allApprovedProject,"aaaaaaaaaaaaaaaaaaaaaaaaaaa")
      this.totalPageLength=resp.result.pagination.len_of_data
    },(error:any)=>{
      console.log(error);
      
    }
  
    )
  }

  viewTask(id:any){
    this.route.navigate(['/inner/student/project-management/task-details/' + id])
  }
}

