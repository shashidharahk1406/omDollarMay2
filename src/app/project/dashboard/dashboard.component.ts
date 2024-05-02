import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

interface TimesheetEntry {
  projectName: string;
  taskName: string;
  date: Date;
  hoursWorked: number;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user_id:any
  details:any
  role:any
  constructor(private api:ApiService,private router:Router) { 
    this.user_id=localStorage.getItem('user_id')
    this.role=localStorage.getItem('role')

    if(this.role=='Supervisor'){
      this.router.navigate(['inner/officials/project/view'])
    }
    else if(this.role=='Volunteer'){
      this.router.navigate(['inner/student/project/view'])
    }
    else if(this.role=='Project Owner'){
      this.router.navigate(['inner'])
    }
    else if(this.role=='Super Admin'){
      this.router.navigate(['inner/super-admin'])
    }

  }

  ngOnInit(): void {
    this.getDashBoard()
  }

  getDashBoard(){
    this.api.dashBoard(this.user_id).subscribe(
      (resp:any)=>{

        this.details=resp.result

      },
      (error:any)=>{
        console.log(error);
      }
    )
  }
  selectedDate!: Date;
  next7Days: Date[] = [];
  onDateChange(event: any) {
    this.selectedDate = event.value;
    this.calculateNext7Days();
  }

  dateFilter = (date: Date | null): boolean => {
    if (!date) return false;
    // Allow only Sundays
    return date.getDay() === 0;
  };
  private calculateNext7Days() {
    this.next7Days = [];

    for (let i = 0; i < 7; i++) {
      const nextDate = new Date(this.selectedDate);
      nextDate.setDate(this.selectedDate.getDate() + i + 1);
      this.next7Days.push(nextDate);
    }
  }
}
