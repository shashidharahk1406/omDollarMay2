import {Component,OnInit,ViewChild} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.css']
})
export class RewardComponent implements OnInit {
  @ViewChild('deleteClose') deleteClose:any;
  pageSize= 5;
  currentPage=1;
  user_id:any;
  role:any;
  totalPageLength:any;
  searchRewardProject:any
  allRewardProject:any=[]
  constructor(private api:ApiService,private route:Router) { 
    this.user_id=localStorage.getItem('user_id')
    this.role=localStorage.getItem('role')

  }
  ngOnInit(): void {
    this.getRewardProject()
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
    if(this.role =="Supervisor"){
      let user = "user_id"
      this.api.getRewardProject(user,this.currentPage+1,this.pageSize,this.user_id).subscribe((resp:any)=>{
        this.allRewardProject= resp.result.data;
        this.totalPageLength=resp.result.pagination.len_of_data
      },(error:any)=>{
        console.log(error);
        
      }
    
      )
    }
    else if(this.role =="Project Owner"){
      let user = "owner_id"
      this.api.getRewardProject(user,this.currentPage+1,this.pageSize,this.user_id).subscribe((resp:any)=>{
        this.allRewardProject= resp.result.data;
        this.totalPageLength=resp.result.pagination.len_of_data
      },(error:any)=>{
        console.log(error);
        
      }
    
      )
    }
  }
    getRewardProject(){
      if(this.role =="Supervisor"){
        let user = "user_id"
        this.api.getRewardProject(user,this.currentPage,this.pageSize,this.user_id).subscribe((resp:any)=>{
          this.allRewardProject= resp.result.data;
          this.totalPageLength=resp.result.pagination.len_of_data
        },(error:any)=>{
          console.log(error);
          
        }
      
        )
      }
      else if(this.role =="Project Owner"){
        let user = "owner_id"
        this.api.getRewardProject(user,this.currentPage,this.pageSize,this.user_id).subscribe((resp:any)=>{
          this.allRewardProject= resp.result.data;
          this.totalPageLength=resp.result.pagination.len_of_data
        },(error:any)=>{
          console.log(error);
          
        }
      
        )
      }

  }

  viewTask(id:any){
    this.route.navigate(['/inner/officials/reward/create/' + id])
  }
}
