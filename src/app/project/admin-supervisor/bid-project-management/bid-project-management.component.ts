import {Component,OnInit,ViewChild} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
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
  searchBidManagement:any='';
  allBidManagement:any=[];
  user_id:any;
  role:any;
  user:any;
  private searchTerms = new Subject<string>();
  constructor(private api:ApiService,private route:Router) { 
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
      switchMap((query: string) =>this.api.getBidManagement(this.user,this.user_id,this.currentPage+1,this.pageSize,query))).subscribe((resp:any)=>{
        this.allBidManagement= resp.result.data;
        this.totalPageLength=resp.result.pagination.len_of_data
      },(error:any)=>{
        console.log(error); 
      }
      )
  }
  arrow:boolean=false
  directionValue:any='asc'

  sortValue:any='project_id__project_name'
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
    this.api.getBidManagement(this.user,this.user_id,this.currentPage+1,this.pageSize,this.searchBidManagement).subscribe((resp:any)=>{
      this.allBidManagement= resp.result.data;
      this.totalPageLength=resp.result.pagination.len_of_data
    },(error:any)=>{
      console.log(error);
      
    }
  
    )
  }
    getBidManagement(){
      this.api.getBidManagement(this.user,this.user_id,this.currentPage+1,this.pageSize,this.searchBidManagement).subscribe((resp:any)=>{
        this.allBidManagement= resp.result.data;
        this.totalPageLength=resp.result.pagination.len_of_data
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
}