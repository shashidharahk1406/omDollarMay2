import {Component,OnInit,ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {PageEvent} from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { SortingConfigModalComponent } from 'src/app/shared/sorting-config-modal/sorting-config-modal.component';
// import { SortPipe } from 'src/app/pipe/sort/sort.pipe';
@Component({
  selector: 'app-bid-project-management',
  templateUrl: './bid-project-management.component.html',
  styleUrls: ['./bid-project-management.component.css'],
  // providers:[SortPipe]
})
export class BidProjectManagementComponent implements OnInit {
  @ViewChild('deleteClose') deleteClose:any;
  pageSize= 5;
  currentPage=0;
  pageIndex=0;
  totalPageLength:any;
  totalDataCount:any=0;
  searchBidManagement:any='';
  allBidManagement:any=[];
  user_id:any;
  role:any;
  user:any;
  private searchTerms = new Subject<string>();
  constructor(private api:ApiService,private route:Router,public dialog: MatDialog) { 
    this.user_id= localStorage.getItem('user_id')
    this.role=localStorage.getItem('role')
    if(this.role =="Supervisor"){
      this.user = "user"
    }
    else if(this.role =="Project Owner"){
      this.user = "owner"
      
    }
  }
  ngOnInit(): void {
    this.getBidManagement();
    this.searchTerms
    .pipe(
      debounceTime(300), // Wait for 300ms pause in events
      distinctUntilChanged(), // Ignore if next search term is the same as the previous one
      switchMap((query: string) =>this.api.getBidManagement(this.user,this.user_id,this.currentPage+1,this.pageSize,query,this.sortValue,this.directionValue))).subscribe((resp:any)=>{
        this.allBidManagement= resp.result.data;
        this.totalPageLength=resp.result.pagination.len_of_data;
        this.totalDataCount=resp.result.pagination.total_len_of_data;
      },(error:any)=>{
        console.log(error); 
      }
      )
  }
  arrow:boolean=false
  directionValue:any='';

  sortValue:any='';
  
  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.pageIndex=event.pageIndex;
    this.api.getBidManagement(this.user,this.user_id,this.currentPage+1,this.pageSize,this.searchBidManagement,this.sortValue,this.directionValue).subscribe((resp:any)=>{
      this.allBidManagement= resp.result.data;
      this.totalPageLength=resp.result.pagination.len_of_data;
      this.totalDataCount=resp.result.pagination.total_len_of_data;
    },(error:any)=>{
      console.log(error);
      
    }
  
    )
  }
    getBidManagement(){
      this.api.getBidManagement(this.user,this.user_id,this.currentPage+1,this.pageSize,this.searchBidManagement,this.sortValue,this.directionValue).subscribe((resp:any)=>{
        this.allBidManagement= resp.result.data;
        this.totalPageLength=resp.result.pagination.len_of_data;
        this.totalDataCount=resp.result.pagination.total_len_of_data;
      },(error:any)=>{
        console.log(error);
        
      }
    
      )

  }

  viewTask(id:any){
    this.route.navigate(['/inner/officials/bid-project-management/task/' + id])
  }
  getContinuousIndex(index: number):number {
    return this.pageIndex * this.pageSize + index + 1;
  }
  onSearchInput(): void {
    this.searchTerms.next(this.searchBidManagement);
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
    this.getBidManagement();
  });
  }
}