import {Component,OnInit} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { ViewChild } from '@angular/core';
import { SortPipe } from 'src/app/pipe/sort/sort.pipe';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @ViewChild('deleteClose') deleteClose:any;
  pageSize= 5;
  currentPage=1;
  totalPageLength:any;
  searchProject:any
  role:any
  user_id:any
  allUser:any=[]
  allRateCard:any=[]
  allStatus:any=[]

  constructor(private api:ApiService,private route:Router) { 
    this.user_id=localStorage.getItem('user_id')
    this.role=localStorage.getItem('role')
  }
  ngOnInit(): void {
    this.getProject()
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
  pageChanged(event: any) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    if(this.role =="Super Admin"){

this.api.getUser(this.currentPage+1,this.pageSize).subscribe((resp:any)=>{
      this.allUser= resp.result.data;
      this.totalPageLength=resp.result.pagination.len_of_data
    },(error:any)=>{
      console.log(error);
      
    }
  
    )
    }
    }
  getProject(){
    if(this.role =="Super Admin"){
this.api.getUser(this.currentPage,this.pageSize).subscribe((resp:any)=>{
      this.allUser= resp.result.data;
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
    this.api.deleteUser(this.selectedId).subscribe((data:any)=>{
      this.getProject()
      this.api.showError('User Deleted Successfully')
      this.getProject();
      this.deleteClose.nativeElement.click();
    },(error:any)=>{
      console.log(error);

    })
    
  }
}
