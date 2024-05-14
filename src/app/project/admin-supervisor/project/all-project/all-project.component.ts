import {Component,OnInit} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { ViewChild } from '@angular/core';
import { SortPipe } from 'src/app/pipe/sort/sort.pipe';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-all-project',
  templateUrl: './all-project.component.html',
  styleUrls: ['./all-project.component.css'],
  providers:[SortPipe]
})
export class AllProjectComponent implements OnInit {
  @ViewChild('deleteClose') deleteClose:any;
  @ViewChild('projectClose') projectClose:any;
  pageSize= 5;
  currentPage=0;
  pageIndex=0;
  totalPageLength:any;
  searchProject:any='';
  role:any
  user_id:any
  allProject:any=[]
  allRateCard:any=[]
  allStatus:any=[];
  isLoading:boolean=false;
  point:any;
  user:any;
  private searchTerms = new Subject<string>();
  constructor(private api:ApiService,private route:Router) { 
    this.user_id=localStorage.getItem('user_id')
    this.role=localStorage.getItem('role');
    if(this.role =="Supervisor"){
     this.user = "user"
     this.point="projectbysupervisors"
    }
    else if(this.role =="Project Owner"){
      this.user = "owner_id"
      this.point="get-project-owner"
    }
  }
  ngOnInit(): void {
    this.getProject(this.searchProject);
    this.rateCard();
    this.status(); 
    this.searchTerms
    .pipe(
      debounceTime(300), // Wait for 300ms pause in events
      distinctUntilChanged(), // Ignore if next search term is the same as the previous one
      switchMap((query: string) =>this.api.getProject(this.point,this.user,this.user_id,this.currentPage+1,this.pageSize,query))).subscribe((resp:any)=>{
        this.allProject= resp.result.data;
        this.totalPageLength=resp.result.pagination.len_of_data
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
  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.pageIndex=event.pageIndex;
    this.api.getProject(this.point,this.user,this.user_id,this.currentPage+1,this.pageSize,this.searchProject).subscribe((resp:any)=>{
      this.allProject= resp.result.data;
      this.totalPageLength=resp.result.pagination.len_of_data
    },(error:any)=>{
      console.log(error);
      
    }
  
    )
    }

   
  getProject(searchProject:any){
    this.api.getProject(this.point,this.user,this.user_id,this.currentPage+1,this.pageSize,searchProject).subscribe((resp:any)=>{
      this.allProject= resp.result.data;
      this.totalPageLength=resp.result.pagination.len_of_data;
      
      
    },(error:any)=>{
      console.log(error);
      
    }
  
    )
    
  }

  rateCard(){
    this.api.getAllRateCard().subscribe(
      (resp:any)=>{
        this.allRateCard=resp.result.data
      },
      (error:any)=>{

      }
    )
  }
  status(){
    this.api.getStatus().subscribe(
      (resp:any)=>{
        this.allStatus=resp.result.data
        console.log(this.allStatus,"status")
      },
      (error:any)=>{

      }
    )
  }
  rateCardLabel(data:any){
    const rateLabel= this.allRateCard.find((x:any)=> x.id== data)
    return rateLabel?.sl_no
  }
  statusLabel(data:any){
    const statusLabel= this.allStatus.find((x:any)=> x.id== data)
    return statusLabel?.name
  }
  selectedId:any
  id(id:any){
    this.selectedId =id;

  }
  editRoute(){
    this.route.navigate(['inner/officials/project/edit/'+ this.selectedId])
  }
  delete(){
    this.api.deleteProject(this.selectedId).subscribe((data:any)=>{
      this.api.showError('Project Deleted Successfully')
      this.ngOnInit();
      this.deleteClose.nativeElement.click();
    },error=>{
      console.log(error);
      
    })
    
  }

  close(){
    let data={
      "project_id": this.selectedId,
      "project_status_id":3
    }
    this.api.closeProject(data).subscribe((data:any)=>{
      this.isLoading=true;
      console.log(data,"ddddddddddddddddddddddddd");
      
      this.api.showWarning('Project Closed Successfully')
      this.ngOnInit();
      this.projectClose.nativeElement.click();
    },error=>{
      this.isLoading=false;
      console.log(error);
      
    })
    
  }
  getContinuousIndex(index: number):number {
    return this.pageIndex * this.pageSize + index + 1;
  }
  onSearchInput(): void {
    this.searchTerms.next(this.searchProject);
  }
}




