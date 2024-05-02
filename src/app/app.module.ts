import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import{MatTabsModule}from"@angular/material/tabs";
import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {MatSortModule} from '@angular/material/sort';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SharedModule } from './shared/shared.module';
// import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { ToastrModule } from 'ngx-toastr';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgOtpInputModule } from 'ng-otp-input';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgMultiSelectDropDownModule,
    MatSortModule,
    Ng2SearchPipeModule,
    SharedModule,
    ToastrModule.forRoot({timeOut:1000}),
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatFormFieldModule ,
    NgOtpInputModule,
    // MatSelectCountryModule.forRoot('de')
    MatSelectCountryModule
    // NgxMatDatetimePickerModule, NgxMatTimepickerModule 
  ],
  providers: [DatePipe,{provide: LocationStrategy, useClass: HashLocationStrategy},{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
