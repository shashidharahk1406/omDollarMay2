import {Component,OnInit,ViewChild} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { SortPipe } from 'src/app/pipe/sort/sort.pipe';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-rejected-task',
  templateUrl: './rejected-task.component.html',
  styleUrls: ['./rejected-task.component.css']
})
export class RejectedTaskComponent implements OnInit {
  
  id:any
  user_id:any
  pageSize= 5;
  currentPage=0;
  pageIndex=0;
  totalPageLength:any;
  searchTask:any
  allTasks:any=[]
  data:any
  status:any="Declined"
  constructor(private route:ActivatedRoute,private api:ApiService,private router:Router) {
    this.id=Number(this.route.snapshot.paramMap.get('id'))
    this.user_id=localStorage.getItem('user_id')
   }

  ngOnInit(): void {
    this.getTask()
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
    this.pageIndex=event.pageIndex;
    this.api.getTaskDetailsByProjectId(this.id,this.currentPage+1,this.pageSize,this.status).subscribe((resp:any)=>{
      this.allTasks= resp.result.data;;
      this.totalPageLength=resp.result.pagination.len_of_data
    },(error:any)=>{
      console.log(error);
      
    })}
    getTask(){
    this.api.getTaskDetailsByProjectId(this.id,this.currentPage+1,this.pageSize,this.status).subscribe((resp:any)=>{
      this.allTasks= resp.result.data;
      this.totalPageLength=resp.result.pagination.len_of_data
    },(error:any)=>{
      console.log(error);
      
    }
  
    )
  }
  viewTimeSheet(task_id:any){
    this.router.navigate(['inner/officials/bid-project-management/viewTimesheet/'+ this.id + '/task/' + task_id])
  }
  getContinuousIndex(index: number):number {
    return this.pageIndex * this.pageSize + index + 1;
  }
}

