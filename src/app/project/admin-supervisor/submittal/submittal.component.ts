import {Component,OnInit,ViewChild} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { SortPipe } from 'src/app/pipe/sort/sort.pipe';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { SortingConfigModalComponent } from 'src/app/shared/sorting-config-modal/sorting-config-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-submittal',
  templateUrl: './submittal.component.html',
  styleUrls: ['./submittal.component.css'],
  providers:[SortPipe]
})
export class SubmittalComponent implements OnInit {
  @ViewChild('deleteClose') deleteClose:any;
  pageSize= 5;
  currentPage=0;
  pageIndex:any=0;
  totalPageLength:any;
  totalDataCount:any=0;
  searchSubmittals:any='';
  user_id:any
  role:any;
  allSubmittals:any=[];
  user:any;
  private searchTerms = new Subject<string>();
  constructor(private api:ApiService,private route:Router,public dialog: MatDialog) {
    this.user_id= localStorage.getItem('user_id')
    this.role=localStorage.getItem('role')
    if(this.role =="Supervisor"){
      this.user = "user_id"
      
    }
    else if(this.role =="Project Owner"){
      this.user = "owner_id"
    }
   }
  ngOnInit(): void {
    this.getSubmittals();
    this.searchTerms
      .pipe(
        debounceTime(300), // Wait for 300ms pause in events
        distinctUntilChanged(), // Ignore if next search term is the same as the previous one
        switchMap((query: string) =>this.api.getSubmittals(this.user,this.user_id,this.currentPage+1,this.pageSize,query,this.sortValue,this.directionValue))).subscribe((resp:any)=>{
          this.allSubmittals= resp.result.data;
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
    this.api.getSubmittals(this.user,this.user_id,this.currentPage+1,this.pageSize,this.searchSubmittals,this.sortValue,this.directionValue).subscribe((resp:any)=>{
      this.allSubmittals= resp.result.data;
      this.totalPageLength=resp.result.pagination.len_of_data;
      this.totalDataCount=resp.result.pagination.total_len_of_data;
    },(error:any)=>{
      console.log(error);
      
    }
  
    )
  }
    getSubmittals(){
      this.api.getSubmittals(this.user,this.user_id,this.currentPage+1,this.pageSize,this.searchSubmittals,this.sortValue,this.directionValue).subscribe((resp:any)=>{
        this.allSubmittals= resp.result.data;
        
        this.totalPageLength=resp.result.pagination.len_of_data;
        this.totalDataCount=resp.result.pagination.total_len_of_data;
      },(error:any)=>{
        console.log(error);
        
      }
    
      )

  }

  selectedId:any
  id(id:any){
    this.selectedId =id
  }
  editRoute(){
    this.route.navigate(['inner/officials/project/edit/'+ this.selectedId])
  }
  delete(){
    this.api.deleteProject(this.selectedId).subscribe((data:any)=>{
      this.ngOnInit();
      this.deleteClose.nativeElement.click();
    },error=>{
      console.log(error);
      
    })
    
  }
  viewBidder(id:any){
    this.route.navigate(['inner/officials/submittal/view-bidders/' + id])
  }
 
  getContinuousIndex(index: number):number {
    return this.pageIndex * this.pageSize + index + 1;
  }
  onSearchInput(): void {
    this.searchTerms.next(this.searchSubmittals);
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
    this.getSubmittals();
  });
  }
}
