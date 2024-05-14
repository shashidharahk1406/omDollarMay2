import {Component,OnInit,ViewChild} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.css']
})
export class RewardComponent implements OnInit {
  @ViewChild('deleteClose') deleteClose:any;
  pageSize= 5;
  currentPage=0;
  pageIndex=0;
  user_id:any;
  role:any;
  totalPageLength:any;
  searchRewardProject:any='';
  allRewardProject:any=[];
  user:any;
  private searchTerms = new Subject<string>();
  constructor(private api:ApiService,private route:Router) { 
    this.user_id=localStorage.getItem('user_id')
    this.role=localStorage.getItem('role')
    if(this.role =="Supervisor"){
     this.user = "user_id";
    }
     else if(this.role =="Project Owner"){
      this.user = "owner_id";
      }
  }
  ngOnInit(): void {
    this.getRewardProject();
    this.searchTerms
    .pipe(
      debounceTime(300), // Wait for 300ms pause in events
      distinctUntilChanged(), // Ignore if next search term is the same as the previous one
      switchMap((query: string) => this.api.getRewardProject(this.user,this.currentPage+1,this.pageSize,this.user_id,query))).subscribe((resp:any)=>{
        this.allRewardProject= resp.result.data;
        this.totalPageLength=resp.result.pagination.len_of_data
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
    this.api.getRewardProject(this.user,this.currentPage+1,this.pageSize,this.user_id,this.searchRewardProject).subscribe((resp:any)=>{
      this.allRewardProject= resp.result.data;
      this.totalPageLength=resp.result.pagination.len_of_data
    },(error:any)=>{
      console.log(error);
      
    }
  
    )
  }
    getRewardProject(){
      this.api.getRewardProject(this.user,this.currentPage+1,this.pageSize,this.user_id,this.searchRewardProject).subscribe((resp:any)=>{
        this.allRewardProject= resp.result.data;
        this.totalPageLength=resp.result.pagination.len_of_data
      },(error:any)=>{
        console.log(error);
        
      }
    
      )

  }

  viewTask(id:any){
    this.route.navigate(['/inner/officials/reward/create/' + id])
  }
  getContinuousIndex(index: number):number {
    return this.pageIndex * this.pageSize + index + 1;
  }
  onSearchInput(): void {
    this.searchTerms.next(this.searchRewardProject);
  }
}
