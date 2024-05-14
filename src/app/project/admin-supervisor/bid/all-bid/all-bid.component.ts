import {Component,OnInit, ViewChild} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
@Component({
  selector: 'app-all-bid',
  templateUrl: './all-bid.component.html',
  styleUrls: ['./all-bid.component.css']
})
export class AllBidComponent implements OnInit {
  @ViewChild('deleteClose') deleteClose:any;
  pageSize= 5;
  currentPage=1;
  pageIndex=0;
  totalPageLength:any;
  searchProject:any='';
  role:any
  user_id:any;
  user:any;
  allBidProject:any=[]
  arrow:boolean=false
  directionValue:any='asc'
  private searchTerms = new Subject<string>();
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

  constructor(private api:ApiService,private route:Router) {
    this.role=localStorage.getItem('role')
    this.user_id=localStorage.getItem('user_id');
    if(this.role =="Supervisor"){
      this.user = "supervisor_id";
    }
    else if(this.role =="Project Owner"){
      this.user = "owner_id"
    }
   }
  ngOnInit(): void {
    // this.getAllBid()
    this.getProject();
    this.searchTerms
    .pipe(
      debounceTime(300), // Wait for 300ms pause in events
      distinctUntilChanged(), // Ignore if next search term is the same as the previous one
      switchMap((query: string) =>this.api.getBidProject(this.currentPage,this.pageSize,this.user_id,this.user,query))).subscribe((resp:any)=>{
        this.allBidProject= resp.result.data;
        this.totalPageLength=resp.result.pagination.len_of_data;
      },(error:any)=>{
        console.log(error); 
      }
      )
  }
  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex+1;
    this.pageIndex=event.pageIndex;
    this.api.getBidProject(this.currentPage,this.pageSize,this.user_id,this.user,this.searchProject).subscribe((resp:any)=>{
      this.allBidProject= resp.result.data;
      this.totalPageLength=resp.result.pagination.len_of_data;
    },(error:any)=>{
      console.log(error);
      
    })
    



}
  getProject(){
    this.api.getBidProject(this.currentPage,this.pageSize,this.user_id,this.user,this.searchProject).subscribe((resp:any)=>{
      this.allBidProject= resp.result.data;
      this.totalPageLength=resp.result.pagination.len_of_data
    },(error:any)=>{
      console.log(error);
      
    })
  }
  allBid:any=[]
  getAllBid(){
    this.api.getAllBidProject().subscribe(
      (resp:any)=>{
        this.allBid=resp.result.data 
      },
      (error:any)=>{

      }
    )
  }
  selectedId:any
  id(id:any){
    this.selectedId =id
  }
  editRoute(){
    this.route.navigate(['inner/officials/bid/edit/'+ this.selectedId])
  }
  delete(){
    this.api.deleteProjectBid(this.selectedId).subscribe((data:any)=>{
      this.api.showError('Bid Deleted Successfully')
      this.ngOnInit();
      this.deleteClose.nativeElement.click();
    },error=>{
      console.log(error);
      
    })
    
  }
  projectBidLabel(id:any){
    const projectBidLabel= this.allBidProject.find((x:any)=> x.project_id_id== id)

    return projectBidLabel?.project_id_id
  }
  getContinuousIndex(index: number):number {
    return this.pageIndex * this.pageSize + index + 1;
  }
  onSearchInput(): void {
    this.searchTerms.next(this.searchProject);
  }
}

