import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { AuthService } from '../services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import { UserauthenicationService } from '../services/userauthenication.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
drawer: any;

  constructor(private dialog : MatDialog , private authservice : AuthService , private authenticationservice : UserauthenicationService) { }
  
  ngOnInit(): void {
  }

}
