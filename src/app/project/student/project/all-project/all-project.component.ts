import {Component,OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {PageEvent} from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { SortingConfigModalComponent } from 'src/app/shared/sorting-config-modal/sorting-config-modal.component';

@Component({
  selector: 'app-all-project',
  templateUrl: './all-project.component.html',
  styleUrls: ['./all-project.component.css']
})
export class AllProjectComponent implements OnInit {
  @ViewChild('close') close:any;
  pageSize= 5;
  currentPage=0;
  pageIndex:any=0;
  totalPageLength:any;
  totalDataCount:any=0;
  data:any;
  allBidProject:any=[];
  id:any;
  project_id:any;
  allCountries:any=[];
  searchProject:any='';
  arrow:boolean=false;
  directionValue:any='';
  sortValue:any='';
  projectOwnerSetting = {};
  locationSetting = {};
  allProjectQwner:any=[];
  project_owner:any='';
  projectOwer:any;
  location:any='';
  locationMap:any;
  constructor(private api:ApiService,private route:Router,public dialog: MatDialog) { 
    this.id=localStorage.getItem('user_id')
  }
  private searchTerms = new Subject<string>();
  ngOnInit(): void {
    // this.getAllBid()
    this.getProject();
    this.getCountry();
    this.getAllProjectOwnerList();
    this.projectOwnerSetting = {
      singleSelection: true,
      id: 'user_name',
      textField: 'user_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.searchTerms
      .pipe(
        debounceTime(300), // Wait for 300ms pause in events
        distinctUntilChanged(), // Ignore if next search term is the same as the previous one
        switchMap((query: string) =>this.api.getProjectBidsByUserId(this.currentPage+1,this.pageSize,this.id,this.project_owner,this.location,query,this.sortValue,this.directionValue))).subscribe((resp:any)=>{
          this.allBidProject= resp.result.data;
          this.totalPageLength=resp.result.pagination.len_of_data;
          this.totalDataCount=resp.result.pagination.total_len_of_data;
        },(error:any)=>{
          console.log(error); 
        }
      
        )
  }
  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.pageIndex=event.pageIndex;
    this.getProject();
    // this.api.getProjectByUserId(this.currentPage+1,this.pageSize,this.id,this.project_owner,this.location).subscribe((resp:any)=>{
    //   this.allBidProject= resp.result.data;
    //   this.totalPageLength=resp.result.pagination.len_of_data
    // },(error:any)=>{
    //   console.log(error);
      
    // });
  }
  getProject(){
    this.api.getProjectBidsByUserId(this.currentPage+1,this.pageSize,this.id,this.project_owner,this.location,this.searchProject,this.sortValue,this.directionValue).subscribe((resp:any)=>{
      this.allBidProject= resp.result.data;
      this.totalPageLength=resp.result.pagination.len_of_data;
      this.totalDataCount=resp.result.pagination.total_len_of_data;
    },(error:any)=>{
      console.log(error);
      
    }
  
    )
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
  projectBidLabel(id:any){
    const projectBidLabel= this.allBidProject.find((x:any)=> x.project_id_id== id)

    return projectBidLabel?.project_id_id
  }
  apply(id:any){
    this.project_id=id
   
  }

  applyProject(){
    this.data={
      "project_id":this.project_id,
      "user_id":this.id,
      "status_approval":"Applied",
      // "approved_by_id":
    }
    this.api.applyBid(this.data).subscribe(
      (resp:any)=>{
        
        this.api.showSuccess('Applied Successfully')
        this.ngOnInit()
        this.close.nativeElement.click();
      },
      (error:any)=>{
        console.log(error);
      }
    )

  }

  getCountry(){
    this.locationSetting= {
      singleSelection: true,
      id: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.api.getCountries().subscribe((res:any)=>{
      this.allCountries=res.countries;
      console.log(this.allCountries,"countryyyyyyyyyyyyyyyyyyy")
    })
}

  onProjectOwnerSelect(event: any) {
    console.log("event",event);
    this.project_owner=event.id;
    this.getProject();
  }
  onProjectOwnerDeselect(event:any){
    console.log("event",event);
    this.project_owner='';
    this.getProject();
  }
  onLocationDeSelect(event:any){
    console.log("event",event);
    this.location='';
    this.getProject();
  }
  onLocationSelect(event:any){
    console.log("event",event.id);
    this.location=event.name;
    this.getProject();
  }
  getAllProjectOwnerList(){
    this.api.getProjectOwnerName().subscribe((response:any)=>{
this.allProjectQwner=response;
    },(error:any)=>{
      console.log(error);
    })
  }
  onSearchInput(): void {
    this.searchTerms.next(this.searchProject);
  }

  getContinuousIndex(index: number):number {
    return this.pageIndex * this.pageSize + index + 1;
  }

  // Sorting 
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
    this.getProject();
  });
  }
}

