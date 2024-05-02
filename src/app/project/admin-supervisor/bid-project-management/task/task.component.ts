import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @ViewChild('close') close:any;

  id:any;
  role:any;
  user_id:any;
  project_name:any
  supervisorSetting = {};
  allSupervisor:any=[]
  supervisorId:any
  assigned_supervisor_id:any
  
  error:boolean=false;
  errorAlert:boolean=false;
  isLoading:boolean = false;
  constructor(private api:ApiService,private builder:FormBuilder, private route :ActivatedRoute,private router:Router) {
    this.id =this.route.snapshot.paramMap.get('id')
    this.role = localStorage.getItem('role')
    this.user_id=localStorage.getItem('user_id')
    this.api.getUpdateTask.subscribe(
      (resp:any)=>{
        this.ngOnInit()
      }
    )
   }

  ngOnInit(): void {
    this.supervisor()
    this.getAllProject()
  }
  supervisorForm= this.builder.group({
    "supervisor_id":['',Validators.required],
  })
  get f(){
    return this.supervisorForm.controls;
  }
  getAllProject(){
    this.api.getProjectId(this.id).subscribe(
      (resp:any)=>{
       this.project_name=resp.Message[0].project_name
        this.assigned_supervisor_id = resp.Message[0].supervisor__id
      },
      (error:any)=>{

      }
    )
  }
  supervisor(){
    this.supervisorSetting = {
      singleSelection: true,
      id: 'id',
      textField: 'user_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.api.getAccessSupervisor(this.id).subscribe(
      (resp:any)=>{
       this.allSupervisor=resp.data
       
      
      },
      (error:any)=>{

      }
    )
  }
  onSupervisorSelect(event: any) {
    console.log(event);
    
    this.supervisorId = event.id

    this.supervisorForm.get('supervisor_id')?.setValidators(null)
    this.supervisorForm.get('supervisor_id')?.setErrors(null)
  }
  assign(){
    
    this.supervisorForm.get('supervisor_id')?.setValidators([Validators.required])
    this.supervisorForm.patchValue({supervisor_id: this.supervisorId})
    console.log(this.supervisorId,this.supervisorForm.value);
    
    if(this.supervisorForm.invalid){
      this.error= true;
      this.supervisorForm.get('supervisor_id')?.setValidators([Validators.required])
    }
    else{
      this.isLoading = true;

      setTimeout(() => {
        this.api.assignSupervisor(this.id,this.supervisorForm.value).subscribe(
          (resp:any)=>{
            this.api.showSuccess('Assigned Successfully')
            this.supervisorForm.reset()
            this.isLoading = false;
            this.supervisorId=undefined
            this.close.nativeElement.click();

            this.supervisorForm.get('supervisor_id')?.setValidators(null)
            this.supervisorForm.get('supervisor_id')?.setErrors(null)
            this.ngOnInit()
          },
          (error:any)=>{
            console.log(error);
            this.isLoading = false;
            this.supervisorId=undefined
            this.close.nativeElement.click();

            this.supervisorForm.get('supervisor_id')?.setValidators([Validators.required])
            this.supervisorForm.get('supervisor_id')?.setErrors(null)
            if(error.error.message="Only the supervisor of the project can grant access"){
              this.api.showError('You are not authotized to assign another Supervisor!')
            }
            else{
              this.api.showError('Error!')
            }
          }
          )
      }, 2000);
    
    }
 
  }

  back(){
    if(this.role=='Super Admin'){
      this.router.navigate(['/inner/super-admin/project-details/',this.id])
    }
    else{
      this.router.navigate(['/inner/officials/bid-project-management'])
    }
  
  }
}
