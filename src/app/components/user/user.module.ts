import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from 'src/app/components/user/user-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { MatModule } from 'src/app/module/mat/mat.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    
  ]
})
export class UserModule { }
