import {Component,OnInit,ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {PageEvent} from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { SortingConfigModalComponent } from 'src/app/shared/sorting-config-modal/sorting-config-modal.component';

@Component({
  selector: 'app-reward-history',
  templateUrl: './reward-history.component.html',
  styleUrls: ['./reward-history.component.css']
})
export class RewardHistoryComponent implements OnInit {
  @ViewChild('deleteClose') deleteClose:any;
  pageSize= 5;
  currentPage=0;
  totalPageLength:any;
  totalDataCount:any=0;
  searchReward:any=''
  allReward:any=[]
  id:any
  pageIndex:any=0;
  private searchTerms = new Subject<string>();
  constructor(private api:ApiService,private route:Router,
    private router:ActivatedRoute,public dialog: MatDialog) {
    this.id=localStorage.getItem('user_id')
   }
  ngOnInit(): void {
    this.getReward();
    this.searchTerms
    .pipe(
      debounceTime(300), // Wait for 300ms pause in events
      distinctUntilChanged(), // Ignore if next search term is the same as the previous one
      switchMap((query: string) => this.api.getRewardAdmin(this.id,this.currentPage+1,this.pageSize,query,this.sortValue,this.directionValue))).subscribe((resp:any)=>{
        this.allReward= resp.result.data;
      this.totalPageLength=resp.result.pagination.len_of_data;
      this.totalDataCount=resp.result.pagination.total_len_of_data;
      },(error:any)=>{
        console.log(error); 
      }
      )
  }
  arrow:boolean=false
  directionValue:any=''

  sortValue:any=''

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.pageIndex=event.pageIndex;
    this.api.getRewardAdmin(this.id,this.currentPage+1,this.pageSize,this.searchReward,this.sortValue,this.directionValue).subscribe((resp:any)=>{
      this.allReward= resp.result.data;
      this.totalPageLength=resp.result.pagination.len_of_data;
      this.totalDataCount=resp.result.pagination.total_len_of_data;
    },(error:any)=>{
      console.log(error);
      
    })}
    getReward(){
    this.api.getRewardAdmin(this.id,this.currentPage+1,this.pageSize,this.searchReward,this.sortValue,this.directionValue).subscribe((resp:any)=>{
      this.allReward= resp.result.data;
      this.totalPageLength=resp.result.pagination.len_of_data;
      this.totalDataCount=resp.result.pagination.total_len_of_data;
    },(error:any)=>{
      console.log(error);
      
    }
  
    )
  }

  viewTask(id:any){
    this.route.navigate(['/inner/officials/reward/viewProjectReward/' + id])
  }

  getContinuousIndex(index: number):number {
    return this.pageIndex * this.pageSize + index + 1;
  }
  onSearchInput(): void {
    this.searchTerms.next(this.searchReward);
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
    this.getReward();
  });
  }
}
