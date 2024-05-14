import {Component,OnInit,ViewChild} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-task-reward-history',
  templateUrl: './task-reward-history.component.html',
  styleUrls: ['./task-reward-history.component.css']
})
export class TaskRewardHistoryComponent implements OnInit {

  @ViewChild('deleteClose') deleteClose:any;
  pageSize= 5;
  currentPage=0;
  pageIndex:any=0;
  totalPageLength:any;
  projectInfo:any;
  searchReward:any
  allReward:any=[]
  id:any
  projectId:any
  constructor(private api:ApiService,private route:Router,private router:ActivatedRoute) {
    this.id=localStorage.getItem('user_id')
    this.projectId=Number(this.router.snapshot.paramMap.get('id'))
   }
  ngOnInit(): void {
    this.getReward()
    this.getBidders()
  }
  getBidders(){
    this.api.getSubmittalsbyId(this.projectId).subscribe((resp:any)=>{
      this.projectInfo=resp.project_details

    },(error:any)=>{
      console.log(error);
      
    }
  
    )
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
    this.pageIndex=event.pageIndex;
    this.api.getRewardAdminbyTask(this.projectId,this.currentPage+1,this.pageSize).subscribe((resp:any)=>{
      this.allReward= resp.result.data;
      this.totalPageLength=resp.result.pagination.len_of_data
    },(error:any)=>{
      console.log(error);
      
    })}
    getReward(){
    this.api.getRewardAdminbyTask(this.projectId,this.currentPage+1,this.pageSize).subscribe((resp:any)=>{
      this.allReward= resp.result.data;
      this.totalPageLength=resp.result.pagination.len_of_data
    },(error:any)=>{
      console.log(error);
      
    }
  
    )
  }

  viewTask(id:any){
    this.route.navigate(['/inner/student/reward/view/' + id])
  }
  getContinuousIndex(index: number):number {
    return this.pageIndex * this.pageSize + index + 1;
  }

}
