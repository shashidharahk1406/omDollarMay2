import {Component,OnInit,ViewChild} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { SortPipe } from 'src/app/pipe/sort/sort.pipe';
import { ActivatedRoute } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { SortingConfigModalComponent } from 'src/app/shared/sorting-config-modal/sorting-config-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-view-bidder',
  templateUrl: './view-bidder.component.html',
  styleUrls: ['./view-bidder.component.css']
})
export class ViewBidderComponent implements OnInit {
  @ViewChild('reject') rejectClose:any;
  @ViewChild('accept') acceptClose:any;
  id:any
  role:any
  user_id:any
  pageSize= 5;
  currentPage=0;
  pageIndex=0;
  totalPageLength:any;
  searchBidders:any=''
  allBidders:any=[]
  data:any
  projectInfo:any
  total_no_of_volunteer:any
  no_of_accepted_volunteer:any
  private searchTerms = new Subject<string>();
  constructor(private route:ActivatedRoute,private api:ApiService,private router:Router,public dialog: MatDialog) {
    this.id=Number(this.route.snapshot.paramMap.get('id'))
    this.user_id=localStorage.getItem('user_id')
    this.role=localStorage.getItem('role')
   }

  ngOnInit(): void {
    this.getBidders();
    this.searchTerms
    .pipe(
      debounceTime(300), // Wait for 300ms pause in events
      distinctUntilChanged(), // Ignore if next search term is the same as the previous one
      switchMap((query: string) =>this.api.getSubmittalsbyIdandPagination(this.id,query,this.sortValue,this.directionValue))).subscribe((resp:any)=>{
        this.projectInfo=resp.project_details;
      this.total_no_of_volunteer=resp.project_details.total_people;
      this.no_of_accepted_volunteer=resp.project_details.total_people_approved;
      this.allBidders= resp.Message;
      // this.totalPageLength=resp.result.pagination.number_of_pages*10
      },(error:any)=>{
        console.log(error); 
      }
      )
  }
  arrow:boolean=false
  directionValue:any=''

  sortValue:any=''
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
    this.api.getSubmittalsbyIdandPagination(this.id,this.searchBidders,this.sortValue,this.directionValue).subscribe((resp:any)=>{
      this.projectInfo=resp.project_details;
      this.total_no_of_volunteer=resp.project_details.total_people;
      this.no_of_accepted_volunteer=resp.project_details.total_people_approved;
      this.allBidders= resp.Message;
      // this.totalPageLength=resp.result.pagination.number_of_pages*10
    },(error:any)=>{
      console.log(error);
      
    })}
    getBidders(){
    this.api.getSubmittalsbyIdandPagination(this.id,this.searchBidders,this.sortValue,this.directionValue).subscribe((resp:any)=>{
      this.projectInfo=resp.project_details;
      this.total_no_of_volunteer=resp.project_details.total_people;
      this.no_of_accepted_volunteer=resp.project_details.total_people_approved;
      this.allBidders= resp.Message;
      // this.totalPageLength=resp.result.pagination.number_of_pages*10
    },(error:any)=>{
      console.log(error);
      
    }
  
    )
  }
  selectedId:any
  userId(id:any){
    this.selectedId =id
  }
  approveRejectBidder(status:any){
    if(status=='accept'){
      this.data={
        "approved_by":this.user_id,
        "project_id":this.id,
        "student_id":this.selectedId,
        "status_approval":"Approved"
      }
      this.api.approveBidders(this.data).subscribe((data:any)=>{
        this.ngOnInit();
        this.acceptClose.nativeElement.click();
      },(error:any)=>{
        console.log(error);
        
      })
    }
    else if(status=='reject'){
      this.data={
        "approved_by":this.user_id,
        "project_id":this.id,
        "student_id":this.selectedId,
        "status_approval":"Rejected"
        }
        this.api.approveBidders(this.data).subscribe((data:any)=>{
          this.ngOnInit();
          this.rejectClose.nativeElement.click();
        },(error:any)=>{
          console.log(error);
          
        })
    }
    
    
  }
  
  getContinuousIndex(index: number):number {
    return this.pageIndex * this.pageSize + index + 1;
  }

  onSearchInput(): void {
    this.searchTerms.next(this.searchBidders);
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
    this.getBidders();
  });
  }
}
