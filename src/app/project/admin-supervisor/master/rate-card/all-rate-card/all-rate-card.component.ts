import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import {MatPaginator,PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from 'src/app/services/api/api.service';
@Component({
  selector: 'app-all-rate-card',
  templateUrl: './all-rate-card.component.html',
  styleUrls: ['./all-rate-card.component.css']
})
export class AllRateCardComponent implements OnInit {

  pageSize= 5;
  currentPage=1;
  pageIndex=0;
  totalPageLength:any;

  allRateCard:any=[]


  constructor(private api:ApiService) { }
  ngOnInit(): void {
    this.getRateCard()
  }
  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.pageIndex=event.pageIndex;
    this.api.getRateCard(this.currentPage+1,this.pageSize).subscribe((resp:any)=>{   
      console.log(resp,"resssssssssssssssss")   
      this.allRateCard= resp.result.data;
      this.totalPageLength=resp.result.pagination.number_of_pages*10
    },(error:any)=>{
      console.log(error);
      
    })}
  getRateCard(){
    this.api.getRateCard(this.currentPage,this.pageSize).subscribe((resp:any)=>{
      this.allRateCard= resp.result.data;
      console.log(resp,"resssssssssssssssss") 
      this.totalPageLength=resp.result.pagination.number_of_pages*10
    },(error:any)=>{
      console.log(error);
      
    }
  
    )
  }
  getContinuousIndex(index: number):number {
    return this.pageIndex * this.pageSize + index + 1;
  }

}

