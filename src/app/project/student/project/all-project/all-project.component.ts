import {Component,OnInit, ViewChild} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-all-project',
  templateUrl: './all-project.component.html',
  styleUrls: ['./all-project.component.css']
})
export class AllProjectComponent implements OnInit {
  @ViewChild('close') close:any;
  pageSize= 5;
  currentPage=1;
  totalPageLength:any;
  data:any;
  allBidProject:any=[];
  id:any;
  project_id:any;
  allCountries:any=[];
  searchProject:any='';
  arrow:boolean=false;
  directionValue:any='asc';
  sortValue:any='project_id__project_name';
  projectOwnerSetting = {};
  locationSetting = {};
  allProjectQwner:any=[];
  project_owner:any='';
  projectOwer:any;
  location:any='';
  locationMap:any;
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
    this.id=localStorage.getItem('user_id')
  }
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
  }
  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex+1;
    this.getProject();
    // this.api.getProjectByUserId(this.currentPage,this.pageSize,this.id,this.project_owner,this.location).subscribe((resp:any)=>{
    //   this.allBidProject= resp.result.data;
    //   this.totalPageLength=resp.result.pagination.len_of_data
    // },(error:any)=>{
    //   console.log(error);
      
    // });
  }
  getProject(){
    this.api.getProjectBidsByUserId(this.currentPage,this.pageSize,this.id,this.project_owner,this.location).subscribe((resp:any)=>{
      this.allBidProject= resp.result.data;
      this.totalPageLength=resp.result.pagination.len_of_data
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
}

