import {Component,OnInit,ViewChild} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { SortPipe } from 'src/app/pipe/sort/sort.pipe';
import { ActivatedRoute } from '@angular/router';
import { SortingConfigModalComponent } from 'src/app/shared/sorting-config-modal/sorting-config-modal.component';
import { MatDialog } from '@angular/material/dialog';
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
  constructor(private route:ActivatedRoute,private api:ApiService,
    private router:Router,public dialog: MatDialog) {
    this.id=Number(this.route.snapshot.paramMap.get('id'))
    this.user_id=localStorage.getItem('user_id')
   }

  ngOnInit(): void {
    this.getTask()
  }
  arrow:boolean=false
  directionValue:any=''

  sortValue:any=''

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.pageIndex=event.pageIndex;
    this.api.getTaskDetailsByProjectId(this.id,this.currentPage+1,this.pageSize,this.status,this.sortValue,this.directionValue).subscribe((resp:any)=>{
      this.allTasks= resp.result.data;;
      this.totalPageLength=resp.result.pagination.len_of_data
    },(error:any)=>{
      console.log(error);
      
    })}
    getTask(){
    this.api.getTaskDetailsByProjectId(this.id,this.currentPage+1,this.pageSize,this.status,this.sortValue,this.directionValue).subscribe((resp:any)=>{
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
    this.getTask()
  });
  }
}

