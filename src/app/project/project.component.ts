import { Component, ViewChild, HostListener, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api/api.service';
import { FormBuilder,Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  @ViewChild('logoutClose') logoutClose: any;
  id:any;
  role: any;
  user_id: any;
  wallet_amount: any;
  showToggle: any;
  username: any;
  showToolbar: any;
  mode: any;
  openSidenav: boolean = true;
  error:boolean=false;
  constructor(private router: Router, private api: ApiService,private route: ActivatedRoute,private fb:FormBuilder) {
    this.role = localStorage.getItem('role');
    console.log(this.role,"rolweeeeeeeeeeeeeee")
    this.username = localStorage.getItem('user_name');
    this.user_id = localStorage.getItem('user_id');
    this.id =   this.user_id;
    console.log(this.user_id,"idddddd")
  }

  private screenWidth$ = new BehaviorSubject<number>(window.innerWidth);

  toggleSideNav() {
    this.openSidenav = this.openSidenav ? false : true;
  }

  @ViewChild('sidenav') matSidenav: MatSidenav | undefined;

  ngOnInit() {
    this.getProfileInformation();
    if (this.role === 'Volunteer') {
      this.api.getWalletAmount(this.user_id).subscribe(
        (resp: any) => {
          this.wallet_amount = resp.result.wallet_amount;
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
    this.getScreenWidth().subscribe((width) => {
      if (width < 640) {
        this.showToggle = 'show';
        this.showToolbar = 'hide';
        this.mode = 'over';
        this.openSidenav = false;
      } else if (width > 640) {
        this.showToggle = 'hide';
        this.showToolbar = 'show';
        this.mode = 'side';
        this.openSidenav = true;
      }
    });
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth$.next(event.target.innerWidth);
  }
  getScreenWidth(): Observable<number> {
    return this.screenWidth$.asObservable();
  }
  logout() {
    localStorage.clear();
    this.api.showSuccess('Logout Successful');
    this.logoutClose.nativeElement.click();
    this.router.navigate(['outer']);
  }
  goToHome() {
    if (this.role == 'Project Owner') {
      this.router.navigate(['/inner/dashboard']);
    } else if (this.role == 'Supervisor') {
      this.router.navigate(['/inner/officials/project/view']);
    } else if (this.role == 'Volunteer') {
      this.router.navigate(['/inner/student/project/view']);
    }
  }

  edit(id:any){
    if(this.role=='Project Owner' || this.role=='Supervisor'|| this.role=='Volunteer' ){
      this.router.navigate(['/inner/profile/edit',id])
    }
  
}


profile:any;
getProfileInformation(){

this.api.getProfile(this.id).subscribe((res:any)=>{
  console.log(res,"response")
 
  this.profile=res.result.data;
  console.log(this.profile,"profile information")
})
}


resumeUploadForm=this.fb.group({


  first_name: [''],
  last_name: [''],
  user_name: [''],
  email: [''],
  password: [''],
  role_id__name: [''],
  address: [''],
  phone_number: [''],
  age: [],
  document:['']
  
   
  }
)


get f() {
  return this.resumeUploadForm.controls;
}








// onFileSelected(event: any) {
//   const file = event.target.files[0];
//   const reader = new FileReader();
//   reader.onload = (e) => {
//     this.resumeUploadForm.value.document = reader.result as string;
//     console.log('hhhh',this.resumeUploadForm.value)
//   };
//   reader.readAsDataURL(file);
// }




onFileSelected(event: any) {
  const document: File = event.target.files[0];
  const resumeUploadForm = new FormData();
  resumeUploadForm.append('document', document);
}





create() {
  this.api.createProfile(this.resumeUploadForm.value).subscribe((res:any)=>{
console.log(res,"resume uploaded successfully")
this.api.showSuccess("resume uploaded successfully")
  },(error)=>{
    console.log(error);
  })
  // Here, you can send the form data with the resume as a base64 string to your API.
  // console.log(this.formData);
  // Send the data to your server or perform other actions as needed.
}



}