import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators ,FormArray, FormGroup} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
@Component({
  selector: 'app-view-timesheet',
  templateUrl: './view-timesheet.component.html',
  styleUrls: ['./view-timesheet.component.css']
})
export class ViewTimesheetComponent implements OnInit {
  user_id:any;
  project_id:any;
  start_date:any;
  end_date:any;
  details:any=[];
  array:any=[];
  allMonth:any=[];
  id:any;
  monthId:any;
  date:any=[];
  day:any=[];
  read:any=[];
  monthSetting = {};
  filterDay: any;
  error:boolean=false;
  errorAlert:boolean=false;
  isLoading:boolean = false;
  isLoadingbtn:boolean = false;
  updateTimeSheetForm! : FormGroup
  monthForm! : FormGroup
  working_hour_list!:FormArray
  role:any;
  constructor( private datepipe: DatePipe,private api:ApiService,private builder:FormBuilder,private router:ActivatedRoute,private route:Router) {
    this.user_id=localStorage.getItem('user_id')
    this.id =this.router.snapshot.paramMap.get('id')
    this.project_id= this.router.snapshot.paramMap.get('project_id')
    this.role=localStorage.getItem('role')
    console.log(this.role,"role")
   }

  ngOnInit(): void {
    
    this.updateTimeSheetForm= this.builder.group({
      "id":['',Validators.required],
      "task_name":['',Validators.required],
      "description":['',Validators.required],
      "reason":['',Validators.required],
      "project_id":['',Validators.required],
      "task_status":['',Validators.required],
      "user_id": [''],
      "start_time":['',Validators.required],
      "end_time":['',Validators.required],
      "working_hour_list": this.builder.array([]),
  })
  this.getTimeSheet()
  this.monthForm=this.builder.group({
    "month":['']
  })
  this.month()

  }

  get f(){
    return this.updateTimeSheetForm.controls;
  }
  get contactOption():FormArray{
    return this.updateTimeSheetForm.get('working_hour_list') as FormArray
  }
  month(){
    this.monthSetting = {
      singleSelection: true,
      id: 'id',
      textField: 'month',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.api.getMonthDetails(this.id).subscribe(
      (resp:any)=>{
        this.allMonth=resp.data
        this.filterDay = resp.data[0].month
        let MonthArr:any = []
        this.allMonth.find((item:any)=>{
         
          if(this.filterDay==item.month){
            MonthArr.push(item)
          }
          this.monthForm.patchValue({month:MonthArr})
        })
      },
      (error:any)=>{

      }
    )
  }
  onMonthSelect(event: any) {
    // this.monthId = event.id
    console.log(event);
    this.filterDay = event.month;
    
  }
  updateFilterDay(newFilter: string) {
    this.filterDay = newFilter;
  }
  getTimeSheet(){
    this.api.getTimeSheetDetails(this.id).subscribe(
      (resp:any)=>{
        this.details=resp.data
        this.start_date= this.datepipe.transform(this.parse(resp.data.start_time),'dd/MM/yyyy')
        this.end_date= this.datepipe.transform(this.parse(resp.data.end_time),'dd/MM/yyyy')
        this.updateTimeSheetForm.patchValue({task_name: resp.data.task_name})
        this.updateTimeSheetForm.patchValue({description: resp.data.description})
        this.updateTimeSheetForm.patchValue({project_id: resp.data.project_id})
        this.updateTimeSheetForm.patchValue({task_status: resp.data.task_status})
        // this.updateTimeSheetForm.patchValue({rate_id: resp.data.rate_id})
        this.updateTimeSheetForm.patchValue({user_id: resp.data.user_id})
        // this.updateTimeSheetForm.patchValue({applied_by_id: resp.data.applied_by_id})
        this.updateTimeSheetForm.patchValue({start_time: resp.data.start_time})
        this.updateTimeSheetForm.patchValue({end_time: resp.data.end_time})
        this.updateTimeSheetForm.patchValue({reason:  resp.data.reason})
        // const productArray= <FormArray>this.updateTimeSheetForm.controls['working_hour_list']
      //   this.working_hour_list= this.updateTimeSheetForm.get('working_hour_list') as FormArray;
      //   this.working_hour_list.push(this.builder.group({
      //     size:[''],
      //     product_id:[''],
      //     quantity:['',],
      //     unit_of_measurement:[''],
      //     gst:[''],
      //     price:[''],
      // }))
      this.date=[]
      this.day=[]
      this.read=[]
      this.array=resp.data.working_hour_list
      resp.data.working_hour_list.forEach((element:any) => {
        this.date.push(this.datepipe.transform(this.parse(element.date),'dd/MM/yyyy'))
        this.day.push(element.day)
        this.read.push(element.is_accepted)
        this.contactOption.push(
          this.builder.group({
            date:[element.date,Validators.required],
              month:[element.month],
              day:[element.month],
              hour:[element.hour, [Validators.required, Validators.pattern(/^\d+(\.(25|5|50|75))?$/), Validators.min(0), Validators.max(24)]],
              index:[element.index]
            
          })
        )
        console.log(this.date);
      });
    console.log("productArray",this.contactOption.controls)
      console.log(this.updateTimeSheetForm.value);
        
      },
      (error:any)=>{

      }
    )
  }
  parse(data:any){
    const dateParts =data.split('-');
        const day = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1; // January is 0, so subtract 1
        const year = parseInt(dateParts[2], 10);
        const dateObj = new Date(year, month, day);
        return dateObj
  }
  update(data:any){
    if(data=='edit'){
      this.updateTimeSheetForm.patchValue({id: this.id})
      this.updateTimeSheetForm.patchValue({task_status: "Pending"})
      if(this.updateTimeSheetForm.invalid){
        this.error= true;
      }
      else{
        this.isLoading = true;
  
        setTimeout(() => {
          this.api.updateTaskByProjectId(this.updateTimeSheetForm.value).subscribe(
            (resp:any)=>{
              this.api.showSuccess('Time Sheet Updated Successfully')
              this.route.navigate(['/inner/student/project-management/task-details/' + this.project_id])
              this.isLoading = false;
            },
            (error:any)=>{
              console.log(error);
              this.isLoading = false;
            }
            )
        }, 2000);
      
      }
    }
    else{
      this.updateTimeSheetForm.patchValue({id: this.id})
      this.updateTimeSheetForm.patchValue({task_status: "Submitted"})
      if(this.updateTimeSheetForm.invalid){
        this.error= true;
      }
      else if(data=='submit'){
        this.isLoadingbtn = true;
  
        setTimeout(() => {
          this.api.updateTaskByProjectId(this.updateTimeSheetForm.value).subscribe(
            (resp:any)=>{
              this.api.showSuccess('Time Sheet Submited Successfully')
              this.route.navigate(['/inner/student/project-management/task-details/' + this.project_id])
              this.isLoadingbtn = false;
            },
            (error:any)=>{
              console.log(error);
              this.isLoadingbtn = false;
            }
            )
        }, 2000);
      
      }
    }



 
  }
  onKeyDown(event: KeyboardEvent) {
    // Check if the pressed key is "+" (character code 43) or "E" (character code 69)
    if ((event.keyCode >= 48 && event.keyCode <= 57 || event.keyCode==8)) {
// Prevent the "+" and "E" characters from being entered
    }
    else {
      event.preventDefault(); // Prevent the "+" and "E" characters from being entered
    }
  }
  goBack(){
    if(this.role=='Super Admin'){
      this.route.navigate(['/inner/officials/bid-project-management/task/',this.id])
    }
    else if(this.role=='Volunteer'){
      this.route.navigate(['/inner/student/reward/view/',this.id])
    
    }
    else{
      this.route.navigate(['/inner/officials/bid-project-management/task/' + this.project_id])
    }
    
  }

}
