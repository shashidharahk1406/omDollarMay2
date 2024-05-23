import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { ViewChild } from '@angular/core';
import { SortPipe } from 'src/app/pipe/sort/sort.pipe';
import { PageEvent } from '@angular/material/paginator';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { SortingConfigModalComponent } from 'src/app/shared/sorting-config-modal/sorting-config-modal.component';
import { MatDialog } from '@angular/material/dialog';
// import { error } from 'console';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  @ViewChild('deleteClose') deleteClose:any;
  pageSize= 5;
  currentPage=0;
  pageIndex:any=0;
  totalPageLength:any;
  totalDataCount:any=0;
  searchProject:any='';
  role:any
  user_id:any
  allUser:any=[]
  allRateCard:any=[]
  allStatus:any=[]
  allProjects: any=[];
  
  private searchTerms = new Subject<string>();
  constructor(private api:ApiService,private route:Router,public dialog: MatDialog) { 
    this.user_id=localStorage.getItem('user_id')
    this.role=localStorage.getItem('role')
    
  }
  ngOnInit(): void {
    this.getAllProjects();
    this.searchTerms
    .pipe(
      debounceTime(300), // Wait for 300ms pause in events
      distinctUntilChanged(), // Ignore if next search term is the same as the previous one
      switchMap((query: string) =>this.api.getAllProjectsSuperAdmin(this.currentPage+1,this.pageSize,query,this.sortValue,this.directionValue))).subscribe((resp:any)=>{
        this.allProjects= resp.result.data;
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

  pageChanged(event: any) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.pageIndex=event.pageIndex;
    this.api.getAllProjectsSuperAdmin(this.currentPage+1,this.pageSize,this.searchProject,this.sortValue,this.directionValue).subscribe((res:any)=>{
      console.log(res,"ressssssssssssssss")
        this.allProjects=res.result.data;
        console.log( this.allProjects,"projects")
        this.totalPageLength=res.result.pagination.len_of_data;
        this.totalDataCount=res.result.pagination.total_len_of_data;
      },(error)=>{
        console.log(error)
      })
    }
//   getProject(){
//     if(this.role =="Super Admin"){
// this.api.getAllProjectsSuperAdmin(this.currentPage+1,this.pageSize,this.searchProject).subscribe((resp:any)=>{
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
    this.api.getAllProjectsSuperAdmin(this.currentPage+1,this.pageSize,this.searchProject,this.sortValue,this.directionValue).subscribe((res:any)=>{
    console.log(res,"ressssssssssssssss")
      this.allProjects=res.result.data;
      console.log( this.allProjects,"projects")
      this.totalPageLength=res.result.pagination.len_of_data;
      this.totalDataCount=res.result.pagination.total_len_of_data;
    },(error)=>{
      console.log(error)
    })
  }
  onSearchInput(): void {
    this.searchTerms.next(this.searchProject);
  }

  getContinuousIndex(index: number):number {
    return this.pageIndex * this.pageSize + index + 1;
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
    this.getAllProjects();
  });
  }
}
