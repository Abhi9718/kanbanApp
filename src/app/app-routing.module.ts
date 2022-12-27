import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginGuard } from './guards/login.guard';

import { LoginComponent } from './login/login.component';
import { NavcompComponent } from './navcomp/navcomp.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
{ path:"SignUpView", 
  component:RegisterComponent
},
{ 
  path:"LogInView", 
  component:LoginComponent
},

{
  path:"nav",
  component:NavcompComponent,
  // canActivate:[LoginGuard],
},
{ path:"", 
component:HomeComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }