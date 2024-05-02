import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  error:boolean=false;
  id: any;

  role: any;
  user_id: any;
  errorMessage: any;
  isLoading: boolean=false;
  
  constructor(private builder:FormBuilder,private route:ActivatedRoute,private api:ApiService,private router:Router) { 
    this.id = this.route.snapshot.paramMap.get('id');
    this.role=localStorage.getItem('role')
    this.user_id=localStorage.getItem('user_id');
  }

  ngOnInit(): void {
    this.getProfile();
  }
 editProfileForm = this.builder.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    user_name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    role_id__name: ['', Validators.required],
    id: '',
    address: ['', Validators.required],
    phone_number: ['', Validators.required],
    age: ['', Validators.required],
    document:['']
    
  });
  get f() {
    return this.editProfileForm.controls;
  }


getProfile(){
  this.api.getProfile(this.id).subscribe((res:any)=>{
    console.log(res,"resssssssssssss")
    this.editProfileForm.patchValue({first_name:res.result.data[0].first_name})
    this.editProfileForm.patchValue({last_name:res.result.data[0].last_name})
    this.editProfileForm.patchValue({user_name:res.result.data[0].user_name})
    this.editProfileForm.patchValue({email:res.result.data[0].email})
    this.editProfileForm.patchValue({role_id__name:res.result.data[0].role_id__name})
    this.editProfileForm.patchValue({password:res.result.data[0].password})
    this.editProfileForm.patchValue({address:res.result.data[0].address})
    this.editProfileForm.patchValue({age:res.result.data[0].age})
    this.editProfileForm.patchValue({phone_number:res.result.data[0].phone_number})
    this.editProfileForm.patchValue({document:res.result.data[0].document})
    this.editProfileForm.patchValue({ id: res.result.data[0].id });
      // this.editProfileForm.patchValue({document:document})

  })
  
}




edit(){
  console.log('tyetyr',this.editProfileForm.value)
  

  if (this.editProfileForm.invalid) {
    this.error = true;
    console.log('invalid',this.editProfileForm.controls)
  } else {
    this.isLoading = true;

    setTimeout(() => {
      // this.editProfileForm.valueappend('document',this.editProfileForm.valu  e.document);
      
      console.log('valid',this.editProfileForm)
      // const editProfileForm = new FormData();
      // editProfileForm.append('file', this.editProfileForm.get('fileName').value);
      this.api.editProfile(this.editProfileForm.value).subscribe(
        (resp: any) => {
          console.log(resp,"profile updation")
          this.api.showSuccess('Profile Updated Successfully');
          this.isLoading = false;
          this.router.navigate(['inner/student/project/view']);
        },
        (error: any) => {
          this.errorMessage=error.error;
          console.log(error);
          this.isLoading = false;
          console.log(error);

          if (error.error.error == 'Profile name already exists.') {
            this.api.showError('Profile Name Already Exists!');
          } else {
            this.api.showError('Error!');
          }
        }
      );
    }, 2000);
  }

}

onFileSelected(event: any) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    this.editProfileForm.value.document = reader.result as string;
    console.log('hhhh',this.editProfileForm.value)
  };
  reader.readAsDataURL(file);
}

// onFileSelected(event:any) {
//   if(event.target.files.length > 0) 
//    {
//      this.editProfileForm.patchValue({
//         fileName: event.target.files[0],
//      })
//    }
// }




// onFileSelected(event:any) {
//   if(event.target.files.length > 0) 
//    {
//      this.editProfileForm.patchValue({
//         document: event.target.files[0],
//      })
//    }
// }
}




