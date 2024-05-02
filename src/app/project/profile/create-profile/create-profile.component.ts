import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css'],
})
export class CreateProfileComponent implements OnInit {
  constructor(private builder: FormBuilder) {}

  ngOnInit(): void {}

  createProfileForm = this.builder.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    user_name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    role_id_id: ['', Validators.required],
    name_of_organisation: ['', Validators.required],
    address_of_organisation: ['', Validators.required],
    address: ['', Validators.required],
    phone_number: ['', Validators.required],
    age: ['', Validators.required],
    created_datetime: ['', Validators.required],
    updated_datetime: ['', Validators.required],
  });
  get f() {
    return this.createProfileForm.controls;
  }
}
