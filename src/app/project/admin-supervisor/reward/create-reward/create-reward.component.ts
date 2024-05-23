import {Component,OnInit,ViewChild} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { SortPipe } from 'src/app/pipe/sort/sort.pipe';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { SortingConfigModalComponent } from 'src/app/shared/sorting-config-modal/sorting-config-modal.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-create-reward',
  templateUrl: './create-reward.component.html',
  styleUrls: ['./create-reward.component.css']
})
export class CreateRewardComponent implements OnInit {
  @ViewChild('reward') rewardClose:any;

  id:any
  user_id:any
  pageSize= 5;
  currentPage=0;
  pageIndex=0;
  totalPageLength:any;
  searchTask:any
  allTasks:any=[]
  projectDetail:any=[]
  data:any
  status:any="Accepted"
  error:boolean=false;
  errorMessage:boolean=false;
  role: any;
  constructor(private route:ActivatedRoute,
    private api:ApiService,private router:Router,private builder:FormBuilder,public dialog: MatDialog) {
    this.id=Number(this.route.snapshot.paramMap.get('id'))
    this.user_id=localStorage.getItem('user_id')
    this.role=localStorage.getItem('role')
   }

  ngOnInit(): void {
    this.getProjectReward()
    this.getTask()
  }
  rewardForm= this.builder.group({
    "user_id":['',Validators.required],
    "project_id" :['',Validators.required],
    "task_id" :['',Validators.required],
    "reward_status" :['',Validators.required],
    "rewarded_to" :['',Validators.required],
    

  })
  get f(){
    return this.rewardForm.controls;
  }
  arrow:boolean=false
  directionValue:any='';

  sortValue:any='';
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
    this.api.getTaskDetailsByProjectId(this.id,this.currentPage+1,this.pageSize,this.status,this.sortValue,this.directionValue).subscribe((resp:any)=>{
      this.allTasks= resp.result.data;
      this.totalPageLength=resp.result.pagination.number_of_pages*10
    },(error:any)=>{
      console.log(error);
      
    })}
    getTask(){
    this.api.getTaskDetailsByProjectId(this.id,this.currentPage+1,this.pageSize,this.status,this.sortValue,this.directionValue).subscribe((resp:any)=>{
      this.allTasks= resp.result.data;
      this.totalPageLength=resp.result.pagination.number_of_pages*10
    },(error:any)=>{
      console.log(error);
      
    }
  
    )
  }
    getProjectReward(){
    this.api.getRewardByProjectId(this.id).subscribe((resp:any)=>{
      this.projectDetail= resp.message;
    },(error:any)=>{
      console.log(error);
      
    }
  
    )
  }
  selectedId:any;
  appliedById:any;
  userId(id:any,appliedById:any){
    this.selectedId =id
    this.appliedById =appliedById
  }
  rewarding(){
    console.log("lpu");
    
    this.rewardForm.patchValue({'user_id':this.user_id})
    this.rewardForm.patchValue({'project_id':this.id})
    this.rewardForm.patchValue({'task_id':this.selectedId})
    this.rewardForm.patchValue({'reward_status':'Rewarded'})
    this.rewardForm.patchValue({'rewarded_to':this.appliedById})
    console.log(this.rewardForm.value,"llp");
    
    if(this.rewardForm.invalid ){
      this.error= true;
      this.errorMessage= false;
    }
    // else if(this.rewardForm.controls['wallet_amount'].value>=this.projectDetail.budget_amount){
    //   this.error= false;
    //   this.errorMessage= true;
    // }
    else{
      this.error= false;
      this.errorMessage= false;
      this.api.assignReward(this.rewardForm.value).subscribe((data:any)=>{
        this.ngOnInit();
        this.api.showSuccess('Rewarded Successfully')
        this.rewardForm.reset()
        this.rewardClose.nativeElement.click();
      },(error:any)=>{
        console.log(error);
        
      })
    }
      
    }    
    
    getContinuousIndex(index: number):number {
      return this.pageIndex * this.pageSize + index + 1;
    }

    applySort(column:any,title:any){
      this.sortValue=column;
      const dialogRef = this.dialog.open(SortingConfigModalComponent, {
        disableClose: true,
        data: {'title':title,'sort_field': column, 'sort_direction': this.directionValue},
        panelClass:'sort-modal-popup'
    })
    dialogRef.afterClosed().subscribe((resp:any) => {
      console.log("Form Sort",resp);
      this.sortValue=resp.sort_field;
      this.directionValue=resp.sort_direction;
      this.getTask();
    });
    }
}
