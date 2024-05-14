import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators ,FormArray, FormGroup, AbstractControl} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
@Component({
  selector: 'app-create-timesheet',
  templateUrl: './create-timesheet.component.html',
  styleUrls: ['./create-timesheet.component.css']
})
export class CreateTimesheetComponent implements OnInit {
  user_id:any;
  project_id:any;
  details:any=[];
  date:any=[];
  day:any=[];
  read:any=[];
  array:any=[];
  allMonth:any=[];
  id:any;
  monthId:any;
  error:boolean=false;
  errorAlert:boolean=false;
  isLoading:boolean = false;
  isLoadingbtn:boolean = false;
  updateTimeSheetForm! : FormGroup
  monthForm! : FormGroup
  working_hour_list!:FormArray
  start_date: any;
  end_date: any;
  filterDay: any;
  submitBtn:boolean=false;
  count:any=0;
  monthSetting = {};
  allBidProject: any;
  totalPageLength: any;
  currentPage: any=1;
  pageSize: any=5;
currentTotalHours:any=0;
remainingEstimatedHours:any;


  constructor( private datepipe: DatePipe,private api:ApiService,private builder:FormBuilder,private router:ActivatedRoute,private route:Router) {
    this.user_id=localStorage.getItem('user_id')
    this.id =this.router.snapshot.paramMap.get('id')
    this.project_id= this.router.snapshot.paramMap.get('project_id')
    this.filterDay = "Sun";
    this.getProject();
   
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
      allowSearchFilter: true,

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
  onSelectAll(event: any) {
    // this.monthId = event.id
    console.log(event);
    this.filterDay = null;
    
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
        console.log(this.array,);
        
        resp.data.working_hour_list.forEach((element:any) => {
          this.currentTotalHours+=Number(element.hour)
          console.log(this.currentTotalHours,"total ours")
          this.date.push(this.datepipe.transform(this.parse(element.date),'dd/MM/yyyy'))
          this.day.push(element.day)
          this.read.push(element.is_accepted)
          if(element.is_accepted== false){
            this.submitBtn=true
          }
          this.contactOption.push(
            this.builder.group({
              date:[element.date,Validators.required],
              month:[element.month],
              day:[element.month],
              hour:[element.hour, [Validators.required, Validators.pattern(/^\d+(\.(25|5|50|75))?$/), Validators.min(0), Validators.max(24)]],
              index:[element.index]
            })
          )
  
        });
           this.updateTimeSheetForm.patchValue({id: this.id})
          this.updateTimeSheetForm.patchValue({task_status: "Pending"})
        this.updateTimeSheetForm.valueChanges.subscribe(() => {
       
          this.api.updateTaskByProjectId(this.updateTimeSheetForm.value).subscribe(
            (resp:any)=>{
              console.log(resp,"responseeeeeeeeeeeee");
              this.remainingEstimatedHours=resp.data.remaining_hours;
              console.log(this.remainingEstimatedHours,"remaining estimated hours")
            },
            (error:any)=>{
              console.log(error);
              this.api.showError(error.error.error)
            }
            )
          
        }); 
        
      },
      (error:any)=>{
        this.api.showError(error.error.error)
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
        this.api.showWarning('Enter hours between 0 and 24.')
      
      }
      else{
        this.isLoading = true;
  
        setTimeout(() => {
          this.api.updateTaskByProjectId(this.updateTimeSheetForm.value).subscribe(
            (resp:any)=>{
              console.log(resp,'updatetask')
              this.api.showSuccess('Time Sheet Updated Successfully')
              this.route.navigate(['/inner/student/project-management/task-details/' + this.project_id])
              this.isLoading = false;
            },
            (error:any)=>{
              console.log(error);
             this.api.showError(error.error.error)

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
        this.api.showWarning('Enter hours between 0 and 24.')
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
              this.api.showError(error.error.error)
              this.isLoadingbtn = false;
            }
            )
        }, 2000);
      
      }
    }



 
  }
  
  goBack(){
    this.route.navigate(['/inner/student/project-management/task-details/' + this.project_id])
  }

  
  onKeyDown(event: any) {
    // Allow only numbers and certain control keys (e.g., backspace, delete, arrow keys)
    console.log(event.target.value,"eeeeeeeeeeeeeeeeeeee")
    // if(this.currentTotalHours > this.estimatedTaskHour){
    //   this.error=!this.error;

    // }

    if (
      (event.keyCode < 48 || event.keyCode > 57) && // Numbers 0 to 9
      ![8, 46, 37, 39,190].includes(event.keyCode) // Backspace, Delete, Left Arrow, Right Arrow
    ) {
      event.preventDefault();
    }
  }

// exceedingHoursFlag:boolean=false;

estimatedTaskHour:any;
  pageChanged(event: any) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    
    this.api.getProjectByUserId(this.currentPage+1,this.pageSize,this.id).subscribe((resp:any)=>{
      this.allBidProject= resp.result.data;
      
      this.totalPageLength=resp.result.pagination.len_of_data
    },(error:any)=>{
      console.log(error);
      
    })}
  getProject(){
    this.api.getProjectByUserId(this.currentPage+1,this.pageSize,this.id).subscribe((resp:any)=>{
      this.allBidProject= resp.result.data;
      this.estimatedTaskHour=resp.result.data[0].project_id__task_estimated_hours;
      console.log( this.estimatedTaskHour,"eeeeeestimatedddddddddd")
      console.log( this.allBidProject,"bdpppppppppppppppppppppp")
      this.totalPageLength=resp.result.pagination.len_of_data;
    },(error:any)=>{
      console.log(error);
      
    }
  
    )
  }


}
