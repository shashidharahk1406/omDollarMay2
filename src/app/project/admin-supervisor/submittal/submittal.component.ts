import {Component,OnInit,ViewChild} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { SortPipe } from 'src/app/pipe/sort/sort.pipe';

@Component({
  selector: 'app-submittal',
  templateUrl: './submittal.component.html',
  styleUrls: ['./submittal.component.css'],
  providers:[SortPipe]
})
export class SubmittalComponent implements OnInit {
  @ViewChild('deleteClose') deleteClose:any;
  pageSize= 5;
  currentPage=1;
  totalPageLength:any;
  searchSubmittals:any
  user_id:any
  role:any
  allSubmittals:any=[]
  constructor(private api:ApiService,private route:Router) {
    this.user_id= localStorage.getItem('user_id')
    this.role=localStorage.getItem('role')

   }
  ngOnInit(): void {
    this.getSubmittals()
  }
  arrow:boolean=false
  directionValue:any='asc'

  sortValue:any='project_name'
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
      let user = "user_id"
      this.api.getSubmittals(user,this.user_id,this.currentPage+1,this.pageSize).subscribe((resp:any)=>{
        this.allSubmittals= resp.result.data;
        
        this.totalPageLength=resp.result.pagination.len_of_data
      },(error:any)=>{
        console.log(error);
        
      }
    
      )
    }
    else if(this.role =="Project Owner"){
      let user = "owner_id"
      this.api.getSubmittals(user,this.user_id,this.currentPage+1,this.pageSize).subscribe((resp:any)=>{
        this.allSubmittals= resp.result.data;
        this.totalPageLength=resp.result.pagination.len_of_data
      },(error:any)=>{
        console.log(error);
        
      }
    
      )
    }
  }
    getSubmittals(){
      if(this.role =="Supervisor"){
        let user = "user_id"
        this.api.getSubmittals(user,this.user_id,this.currentPage,this.pageSize).subscribe((resp:any)=>{
          this.allSubmittals= resp.result.data;
          
          this.totalPageLength=resp.result.pagination.len_of_data
        },(error:any)=>{
          console.log(error);
          
        }
      
        )
      }
      else if(this.role =="Project Owner"){
        let user = "owner_id"
        this.api.getSubmittals(user,this.user_id,this.currentPage,this.pageSize).subscribe((resp:any)=>{
          this.allSubmittals= resp.result.data;
          this.totalPageLength=resp.result.pagination.len_of_data
        },(error:any)=>{
          console.log(error);
          
        }
      
        )
      }

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
 
}
