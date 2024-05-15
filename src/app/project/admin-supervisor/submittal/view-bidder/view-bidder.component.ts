import {Component,OnInit,ViewChild} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { SortPipe } from 'src/app/pipe/sort/sort.pipe';
import { ActivatedRoute } from '@angular/router';

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
  searchBidders:any
  allBidders:any=[]
  data:any
  projectInfo:any
  total_no_of_volunteer:any
  no_of_accepted_volunteer:any
  constructor(private route:ActivatedRoute,private api:ApiService,private router:Router) {
    this.id=Number(this.route.snapshot.paramMap.get('id'))
    this.user_id=localStorage.getItem('user_id')
    this.role=localStorage.getItem('role')
   }

  ngOnInit(): void {
    this.getBidders()
  }
  arrow:boolean=false
  directionValue:any='asc'

  sortValue:any='user_id'
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
  // pageChanged(event: PageEvent) {
  //   this.pageSize = event.pageSize;
  //   this.currentPage = event.pageIndex;
  // this.pageIndex=event.pageIndex;
  //   this.api.getSubmittalsbyId(this.currentPage+1,this.pageSize).subscribe((resp:any)=>{
  //     this.allBidders= resp.result.data;
  //     this.totalPageLength=resp.result.pagination.number_of_pages*10
  //   },(error:any)=>{
  //     console.log(error);
      
  //   })}
    getBidders(){
    this.api.getSubmittalsbyId(this.id).subscribe((resp:any)=>{
      this.projectInfo=resp.project_details
      this.total_no_of_volunteer=resp.project_details.total_people
      this.no_of_accepted_volunteer=resp.project_details.total_people_approved
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


}
