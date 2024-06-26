import {Component,OnInit,ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {PageEvent} from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { SortingConfigModalComponent } from 'src/app/shared/sorting-config-modal/sorting-config-modal.component';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.css']
})
export class ProjectManagementComponent implements OnInit {
  id:any;
  status:any='Approved'
  pageSize= 5;
  currentPage=0;
  pageIndex=0;
  totalPageLength:any;
  totalDataCount:any=0;
  searchBidManagement:any='';
  allApprovedProject:any=[]
  role:any;
  private searchTerms = new Subject<string>();
  constructor(private api:ApiService,private route:Router,public dialog: MatDialog) { 
    this.id=localStorage.getItem('user_id')
    this.role= localStorage.getItem('role')
  }
  ngOnInit(): void {
    this.getproject();
    this.searchTerms
      .pipe(
        debounceTime(300), // Wait for 300ms pause in events
        distinctUntilChanged(), // Ignore if next search term is the same as the previous one
        switchMap((query: string) =>this.api.getApprovedProject(this.currentPage+1,this.pageSize,this.id,this.status,query,this.sortValue,this.directionValue))).subscribe((resp:any)=>{
          this.allApprovedProject= resp.result.data;
          console.log( this.allApprovedProject,"aaaaaaaaaaaaaaaaaaaaaaaaaaa")
          this.totalPageLength=resp.result.pagination.len_of_data;
          this.totalDataCount=resp.result.pagination.total_len_of_data;
        },(error:any)=>{
          console.log(error);    
        }
        )
  }
  arrow:boolean=false
  directionValue:any='';

  sortValue:any=''
  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.pageIndex=event.pageIndex;
    this.api.getApprovedProject(this.currentPage+1,this.pageSize,this.id,this.status,this.searchBidManagement,this.sortValue,this.directionValue).subscribe((resp:any)=>{
      this.allApprovedProject= resp.result.data;      
      this.totalPageLength=resp.result.pagination.len_of_data;
      this.totalDataCount=resp.result.pagination.total_len_of_data;
    },(error:any)=>{
      console.log(error);
      
    })}
    getproject(){
    this.api.getApprovedProject(this.currentPage+1,this.pageSize,this.id,this.status,this.searchBidManagement,this.sortValue,this.directionValue).subscribe((resp:any)=>{
      this.allApprovedProject= resp.result.data;
      console.log( this.allApprovedProject,"aaaaaaaaaaaaaaaaaaaaaaaaaaa")
      this.totalPageLength=resp.result.pagination.len_of_data;
      this.totalDataCount=resp.result.pagination.total_len_of_data;
    },(error:any)=>{
      console.log(error);
      
    }
  
    )
  }

  viewTask(id:any){
    this.route.navigate(['/inner/student/project-management/task-details/' + id])
  }
  onSearchInput(): void {
    this.searchTerms.next(this.searchBidManagement);
  }
  getContinuousIndex(index: number):number {
    return this.pageIndex * this.pageSize + index + 1;
  }

  // Sorting 
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
    this.getproject();
  });
  }
}

