import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { ViewChild } from '@angular/core';
import { SortPipe } from 'src/app/pipe/sort/sort.pipe';
import { PageEvent } from '@angular/material/paginator';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
// import { error } from 'console';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  @ViewChild('deleteClose') deleteClose:any;
  pageSize= 5;
  currentPage=1;
  totalPageLength:any;
  searchProject:any='';
  role:any
  user_id:any
  allUser:any=[]
  allRateCard:any=[]
  allStatus:any=[]
  allProjects: any=[];
  
  private searchTerms = new Subject<string>();
  constructor(private api:ApiService,private route:Router) { 
    this.user_id=localStorage.getItem('user_id')
    this.role=localStorage.getItem('role')
    
  }
  ngOnInit(): void {
    this.getAllProjects();
    this.searchTerms
    .pipe(
      debounceTime(300), // Wait for 300ms pause in events
      distinctUntilChanged(), // Ignore if next search term is the same as the previous one
      switchMap((query: string) =>this.api.getAllProjectsSuperAdmin(this.currentPage,this.pageSize,query))).subscribe((resp:any)=>{
        this.allProjects= resp.result.data;
            this.totalPageLength=resp.result.data.pagination.len_of_data
          },(error:any)=>{
            console.log(error);
            
          }
        
          )
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
    this.currentPage = event.pageIndex+1;
    this.getAllProjects();
    }
//   getProject(){
//     if(this.role =="Super Admin"){
// this.api.getAllProjectsSuperAdmin(this.currentPage,this.pageSize,this.searchProject).subscribe((resp:any)=>{
//   this.allProjects= resp.result.data;
//       this.totalPageLength=resp.result.pagination.len_of_data
      
//     },(error:any)=>{
//       console.log(error);
      
//     }
  
//     )
//     }
//   }

  selectedId:any
  id(id:any){
    this.selectedId =id
  }
  editRoute(){
    this.route.navigate(['inner/officials/project/edit/'+ this.selectedId])
  }
  delete(){
    this.api.deleteUser(this.selectedId).subscribe((data:any)=>{
      this.getAllProjects()
      this.api.showError('User Deleted Successfully')
      this.getAllProjects();
      this.deleteClose.nativeElement.click();
    },(error:any)=>{
      console.log(error);

    })
    
  }

  viewTask(id:any){
    this.route.navigate(['/inner/super-admin/project-details/' + id])
  }


  getAllProjects(){
    if(this.role=="Super Admin")
    this.api.getAllProjectsSuperAdmin(this.currentPage,this.pageSize,this.searchProject).subscribe((res:any)=>{
    console.log(res,"ressssssssssssssss")
      this.allProjects=res.result.data;
      console.log( this.allProjects,"projects")
      this.totalPageLength=res.result.pagination.len_of_data
    },(error)=>{
      console.log(error)
    })
  }
  onSearchInput(): void {
    this.searchTerms.next(this.searchProject);
  }

}
