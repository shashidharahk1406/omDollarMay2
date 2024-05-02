import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css'],
})
export class CreateProjectComponent implements OnInit {
  user_id: any;
  allCountries: any;
  constructor(
    private api: ApiService,
    private builder: FormBuilder,
    private route: Router,
    private datepipe:DatePipe
  ) {}
  statusSetting = {};
  allStatus: any = [];
  statusId: any;

  supervisorSetting = {};
  allSupervisor: any = [];
  supervisorId: any;

  valueRatingSetting = {};
  allRateCard: any = [];
  rateCardId: any;

  error: boolean = false;
  errorAlert: boolean = false;
  isLoading: boolean = false;

  ngOnInit(): void {
    console.log(this.supervisorId);
    this.minDate=this.datepipe.transform(Date(),"yyyy-MM-dd")
    console.log(this.minDate,"mindate")

    this.status();
    this.supervisor();
    this.rateCard();
    this.getCountry();
  }
  createProjectForm = this.builder.group({
    location: ['', Validators.required],
    project_name: [null, Validators.required],
    estimated_hours: [null, Validators.required],
    // "estimation_completion_time" :[null,Validators.required],
    description: [null, Validators.required],
    Skillset: [null, Validators.required],
    outcome_required: [null, Validators.required],
    // "estimated_rate_id":[null,Validators.required],
    terms_and_conditions: [null, Validators.required],
    project_status_id: [null, Validators.required],
    user_ref_id: [null, Validators.required],
    hourly_rate: [null, Validators.required],
    total_people: [null, Validators.required],
    supervisor_id: [null, Validators.required],
    owner_id: [null, Validators.required],
    start_time:[null,Validators.required],
    recurring_project:[null,Validators.required]
  });
  get f() {
    return this.createProjectForm.controls;
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
  onKeyDown(event: KeyboardEvent) {
    // Allow only numbers and certain control keys (e.g., backspace, delete, arrow keys)
    if (
      (event.keyCode < 48 || event.keyCode > 57) && // Numbers 0 to 9
      ![8, 46, 37, 39].includes(event.keyCode) // Backspace, Delete, Left Arrow, Right Arrow
    ) {
      event.preventDefault();
    }
  }
  onWheel(event: WheelEvent) {
    event.preventDefault();
  }
  nameOfTheOrganization: any;
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

        console.log(resp, 'sssssssssssssdddddddddddd');
      },
      (error: any) => {}
    );
  }
  countryName: any;
  onSupervisorSelect(event: any) {
    this.allSupervisor.forEach((element: any) => {
      if (element.id === event.id) {
        this.countryName = element.address_of_organisation;
        console.log(this.countryName, 'country name');
      }
    });
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
  onItemDeselect(event: any) {
    this.supervisorId = undefined;
  }

  create() {
    
    this.createProjectForm.patchValue({ country: 1 });
    this.createProjectForm.patchValue({ project_status_id: 2 });
    this.createProjectForm.patchValue({
      owner_id: Number(localStorage.getItem('user_id')),
    });
    this.createProjectForm.patchValue({
      user_ref_id: Number(localStorage.getItem('user_id')),
    });
    this.createProjectForm.patchValue({ supervisor_id: this.supervisorId });
    if (this.createProjectForm.invalid) {
      this.error = true;
    } else {
      this.isLoading = true;

      setTimeout(() => {
        this.api.createProject(this.createProjectForm.value).subscribe(
          (resp: any) => {
            this.api.showSuccess('Project Created Successfully');
            console.log(resp);
            this.createProjectForm.reset();
            this.route.navigate(['/inner/officials/project/view']);
            this.supervisorId = undefined;
            this.isLoading = false;
          },
          (error: any) => {
            console.log(error);
            if (error.error.Error == 'Project_name Already Exists') {
              this.api.showError('Project Name Already Exists!');
            } else {
              this.api.showError('Error!');
            }
            this.isLoading = false;
            this.supervisorId = undefined;
          }
        );
      }, 2000);
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


minDate:any
  maxDate:any
addFromDate(event:any){
  console.log(event.target.value,"date")
 
}

checkedValue:any;
checkCheckBoxvalue(event:any){
  this.checkedValue=event.checked;
  console.log(this.checkedValue,"chhhhh")
}

}
