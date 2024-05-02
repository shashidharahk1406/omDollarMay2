import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';


@Component({
  selector: 'app-create-rate-card',
  templateUrl: './create-rate-card.component.html',
  styleUrls: ['./create-rate-card.component.css']
})
export class CreateRateCardComponent implements OnInit {

  constructor(private api:ApiService,private builder:FormBuilder) { }
  allRateCard:any=[]

  error:boolean=false;
  errorAlert:boolean=false;
  isLoading:boolean = false;

  ngOnInit(): void {
  
  }
  createRateCardForm= this.builder.group({
    "sl_no":['',Validators.required],
    "work" :['',Validators.required],
    "rate" :['',Validators.required],
  })
  get f(){
    return this.createRateCardForm.controls;
  }

  create(){
    if(this.createRateCardForm.invalid){
      this.error= true;
    }
    else{
      this.isLoading = true;
      setTimeout(() => {
        this.api.createRateCard(this.createRateCardForm.value).subscribe(
          (resp:any)=>{
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
}
