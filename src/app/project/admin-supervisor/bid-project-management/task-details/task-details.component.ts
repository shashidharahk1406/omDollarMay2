import {Component,OnInit,ViewChild} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { SortPipe } from 'src/app/pipe/sort/sort.pipe';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  @ViewChild('reject') rejectClose:any;
  @ViewChild('accept') acceptClose:any;
  id:any
  user_id:any
  pageSize= 5;
  currentPage=0;
  pageIndex=0;
  totalPageLength:any;
  searchTask:any
  allTasks:any=[]
  data:any
  status:any="Pending"
  role: any;
  constructor(private route:ActivatedRoute,private api:ApiService,private router:Router,private builder:FormBuilder) {
    this.id=Number(this.route.snapshot.paramMap.get('id'))
    this.user_id=localStorage.getItem('user_id')
    this.role=localStorage.getItem('role')

   }
   statusForm= this.builder.group({

    "id":['',Validators.required],
    "project_id" :['',Validators.required],
    "user_id" :['',Validators.required],
    "task_status" :['',Validators.required],
    "comment" :['',Validators.required],

  })
  get f(){
    return this.statusForm.controls;
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
  selectedId:any
  volunteer_id:any
  error:boolean=false;
  userId(id:any,volunteer_id:any){
    this.selectedId =id
    this.volunteer_id =volunteer_id
  }
  approveRejectTask(status:any){
    if(status=='accept'){
      // this.data={
      // "id":this.selectedId,
      // "project_id":this.id,
      // "user_id":this.user_id,
      // "task_status":"Accepted"
      // }
      this.statusForm.patchValue({id:this.selectedId})
      this.statusForm.patchValue({project_id:this.id})
      this.statusForm.patchValue({user_id:this.volunteer_id })
      this.statusForm.patchValue({task_status:"Accepted"})
      this.statusForm.patchValue({comment:"Nil"})

      this.api.approveTask(this.statusForm.value).subscribe((data:any)=>{
       
        this.api.showSuccess('Task Accepted and rewarded Successfully')
        this.acceptClose.nativeElement.click();
        setTimeout(() => {
        window.location.reload();
        }, 500);
      },(error:any)=>{
        console.log(error);
        
      })
    }
    else if(status=='reject'){
      this.statusForm.patchValue({id:this.selectedId})
      this.statusForm.patchValue({project_id:this.id})
      this.statusForm.patchValue({user_id:this.user_id})
      this.statusForm.patchValue({task_status:"Declined"})
      if(this.statusForm.invalid){
        this.error= true;
      }
      else{
        this.api.approveTask(this.statusForm.value).subscribe((data:any)=>{
         
        this.api.showWarning('Task Declined Successfully')
          this.rejectClose.nativeElement.click();
          setTimeout(() => {
            window.location.reload();
            }, 500);
        },(error:any)=>{
          console.log(error);
          
        })
      }

    }   
}

viewTimeSheet(task_id:any){
  this.router.navigate(['inner/officials/bid-project-management/viewTimesheet/'+ this.id + '/task/' + task_id])
}
getContinuousIndex(index: number):number {
  return this.pageIndex * this.pageSize + index + 1;
}
}

