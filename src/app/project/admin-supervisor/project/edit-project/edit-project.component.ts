import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css'],
})
export class EditProjectComponent implements OnInit {
  biddedProject = false;
  pageSize= 5;
  currentPage=0;
  totalPageLength:any;
  role:any
  id: any;
  user_id: any;
  currentEstimatedHours: any;
  currentEstimatedOmDollors: any;
  currentEstimatedTotalPeople: any;
  statusIdForEdit:any;
  allBidProject: any;
  allProject: any;
  enableUser: any = false;
  allCountries: any;
  constructor(
    private api: ApiService,
    private builder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.role=localStorage.getItem('role')
    this.user_id=localStorage.getItem('user_id');
    // this.getProject();
    
  }

  statusSetting = {};
  allStatus: any = [];
  statusId: any;

  valueRatingSetting = {};
  allRateCard: any = [];
  rateCardId: any;

  supervisorSetting = {};
  allSupervisor: any = [];
  supervisorId: any;

  error: boolean = false;
  errorAlert: boolean = false;
  isLoading: boolean = false;

  ngOnInit(): void {
    this.status();
    this.supervisor();
    this.rateCard();
    this.getAllProject();
    this.getCountry()
   
  
  
  }
  editProjectForm = this.builder.group({
    project_name: ['', Validators.required],
    estimated_hours: ['', Validators.required],
    // "estimation_completion_time" :['',Validators.required],
    description: ['', Validators.required],
    Skillset: ['', Validators.required],
    outcome_required: ['', Validators.required],
    // "estimated_rate_id":['',Validators.required],
    terms_and_conditions: ['', Validators.required],
    project_status_id: ['', Validators.required],
    user_ref_id: [Number(localStorage.getItem('user_id')), Validators.required],
    hourly_rate: ['', Validators.required],
    id: ['', Validators.required],
    total_people: ['', Validators.required],
    supervisor_id: ['', Validators.required],
    location: ['',Validators.required],
    recurring_project:['']
  });
  get f() {
    return this.editProjectForm.controls;
  }
  status() {
    this.statusSetting = {
      singleSelection: true,
      id: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.api.getStatus().subscribe(
      (resp: any) => {
        this.allStatus = resp.result.data;
      },
      (error: any) => {}
    );
  }
  onStatusSelect(event: any) {
    this.statusId = event.id;
  }
  supervisor() {
    this.supervisorSetting = {
      singleSelection: true,
      id: 'id',
      textField: 'user_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.api.getSupervisor().subscribe(
      (resp: any) => {
        this.allSupervisor = resp.result.data;
      },
      (error: any) => {}
    );
  }
  onSupervisorSelect(event: any) {
    this.supervisorId = event.id;
  }
  rateCard() {
    this.valueRatingSetting = {
      singleSelection: true,
      id: 'id',
      textField: 'work',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.api.getAllRateCard().subscribe(
      (resp: any) => {
        this.allRateCard = resp.result.data;
      },
      (error: any) => {}
    );
  }
  onValueRatingSelect(event: any) {
    this.rateCardId = event.id;
  }

  getAllProject() {
    this.api.getProjectId(this.id).subscribe(
      (resp: any) => {
        console.log(resp,"responseeeeeeeeeeeeee")
        this.currentEstimatedHours = resp.Message[0].estimated_hours;
        console.log(this.currentEstimatedHours, 'hrrrrrrrrr');
        this.currentEstimatedOmDollors = resp.Message[0].hourly_rate;
        console.log(this.currentEstimatedOmDollors, 'dddddddddd');
        this.currentEstimatedTotalPeople = resp.Message[0].total_people;
        console.log(this.currentEstimatedTotalPeople, 'tttttttttttt');
        this.statusIdForEdit=resp.Message[0].project_status_id;
        console.log(this.statusIdForEdit,"seeeeeeeeeee");
        console.log(this.id,"idddddddd");
        

        // let rateCardArr:any = []
        // let rateCard=resp.Message[0].estimated_rate_id
        // this.allRateCard.find((item:any)=>{

        //   if(rateCard==item.id){
        //     this.rateCardId=item.id
        //     rateCardArr.push(item)
        //   }
        // })
       if(resp.Message[0].Bidded_Stage){
        this.enableUser = true
       }
       else{
        this.enableUser = false
       }
       

        let statusArr: any = [];
        let status = resp.Message[0].project_status_id;
        this.allStatus.find((item: any) => {
          if (status == item.id) {
            this.statusId = item.id;
            statusArr.push(item);
          }
        });
        let supervisorArr: any = [];
        let supervisor = resp.Message[0].supervisor__id;
        this.allSupervisor.find((item: any) => {
          if (supervisor == item.id) {
            this.supervisorId = item.id;
            supervisorArr.push(item);
          }
        });
        this.editProjectForm.patchValue({
          project_name: resp.Message[0].project_name,
        });
        this.editProjectForm.patchValue({
          estimated_hours: resp.Message[0].estimated_hours,
        });
        // this.editProjectForm.patchValue({estimation_completion_time:resp.Message[0].estimation_completion_time})
        this.editProjectForm.patchValue({
          description: resp.Message[0].description,
        });
        this.editProjectForm.patchValue({ Skillset: resp.Message[0].Skillset });
        this.editProjectForm.patchValue({ location: resp.Message[0].location });
        this.editProjectForm.patchValue({
          outcome_required: resp.Message[0].outcome_required,
        });
        // this.editProjectForm.patchValue({estimated_rate_id:rateCardArr})
        this.editProjectForm.patchValue({
          terms_and_conditions: resp.Message[0].terms_and_conditions,
        });
        this.editProjectForm.patchValue({ project_status_id: statusArr });
        this.editProjectForm.patchValue({
          hourly_rate: resp.Message[0].hourly_rate,
        });
        this.editProjectForm.patchValue({
          total_people: resp.Message[0].total_people,
        });
        this.editProjectForm.patchValue({recurring_project:resp.Message[0].recurring_project});
        this.editProjectForm.patchValue({ supervisor_id: supervisorArr });
      },
      (error: any) => {}
    );
  }
  errorMessage:any;
  editValidationFlag:boolean=false;
 
 
 
  edit() {
    this.editProjectForm.patchValue({ project_status_id: this.statusId });
    this.editProjectForm.patchValue({ supervisor_id: this.supervisorId });
    this.editProjectForm.patchValue({ country: '1' });

    this.editProjectForm.patchValue({ id: this.id });
    // console.log("this.projectId",this.projectId)biddedProject
    
  
    
   
    if (this.editProjectForm.invalid) {
      this.error = true;
    } else {
      this.isLoading = true;

      setTimeout(() => {
        this.api.editProject(this.editProjectForm.value).subscribe(
          (resp: any) => {
            this.api.showSuccess('Project Updated Successfully');
            this.isLoading = false;
            this.router.navigate(['inner/officials/project/view']);
          },
          (error: any) => {
            this.errorMessage=error.error;
            console.log(error);
            this.isLoading = false;
            console.log(error);

            if (error.error.error == 'Project name already exists.') {
              this.api.showError('Project Name Already Exists!');
            } else {
              this.api.showError('Error!');
            }
          }
        );
      }, 2000);
    }
  }
  estimatedHrsFlag:boolean=false;
  estimatedDollarFlag:boolean=false;
  estimatedVolunteersFlag:boolean=false;
  newValue: any;
  onKeyDown(event: any,text:any ){
    console.log(event.target.value);
    this.newValue = event.target.value;
    // if(this.projectId){
      
    //   if(text=='hours' && (this.newValue < this.currentEstimatedHours)){
    //     this.estimatedHrsFlag=true;
    //     console.log('hours')
    //   }
    // }
    // else if(text=='rate' && (this.newValue < this.currentEstimatedOmDollors)){
    //   this.estimatedDollarFlag=true;
    //   console.log('rate')
    // } else if(text=='volunteer' && (this.newValue < this.currentEstimatedTotalPeople)) 
    // {

    //   this.estimatedVolunteersFlag=true;
    //   console.log('volunteer')
    // }
   
    if (
      (event.keyCode < 48 || event.keyCode > 57) && 
      ![8, 46, 37, 39].includes(event.keyCode) 
    ) {
      event.preventDefault();
    }
  }

  


 
  getCountry(){
    this.api.getCountries().subscribe((res:any)=>{
      console.log(res,"countryyyyyyyyyyyyyyyyyyy")
      this.allCountries=res.countries
      ;
      console.log(this.allCountries,"countryyyyyyyyyyyyyyyyyyy")
    })




}


checkedValue:any;
checkCheckBoxvalue(event:any){
  this.checkedValue=event.checked;
  console.log(this.checkedValue,"chhhhh")
}
}