import {Component,OnInit,ViewChild} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
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
  currentPage=1;
  totalPageLength:any;
  searchBidManagement:any
  allBidManagement:any=[]
  user_id:any
  role:any
  constructor(private api:ApiService,private route:Router) { 
    this.user_id= localStorage.getItem('user_id')
    this.role=localStorage.getItem('role')

  }
  ngOnInit(): void {
    this.getBidManagement()
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
    if(this.role =="Supervisor"){
      let user = "user"
      this.api.getBidManagement(user,this.user_id,this.currentPage+1,this.pageSize).subscribe((resp:any)=>{
        this.allBidManagement= resp.result.data;
        this.totalPageLength=resp.result.pagination.len_of_data
      },(error:any)=>{
        console.log(error);
        
      }
    
      )
    }
    else if(this.role =="Project Owner"){
      let user = "owner"
      this.api.getBidManagement(user,this.user_id,this.currentPage+1,this.pageSize).subscribe((resp:any)=>{
        this.allBidManagement= resp.result.data;
        this.totalPageLength=resp.result.pagination.len_of_data
      },(error:any)=>{
        console.log(error);
        
      }
    
      )
    }
  }
    getBidManagement(){
      if(this.role =="Supervisor"){
        let user = "user"
        this.api.getBidManagement(user,this.user_id,this.currentPage,this.pageSize).subscribe((resp:any)=>{
          this.allBidManagement= resp.result.data;
          this.totalPageLength=resp.result.pagination.len_of_data
        },(error:any)=>{
          console.log(error);
          
        }
      
        )
      }
      else if(this.role =="Project Owner"){
        let user = "owner"
        this.api.getBidManagement(user,this.user_id,this.currentPage,this.pageSize).subscribe((resp:any)=>{
          this.allBidManagement= resp.result.data;
          this.totalPageLength=resp.result.pagination.len_of_data
        },(error:any)=>{
          console.log(error);
          
        }
      
        )
      }

  }

  viewTask(id:any){
    this.route.navigate(['/inner/officials/bid-project-management/task/' + id])
  }
}