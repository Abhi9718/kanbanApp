import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppComponent } from '../app.component';
import { UserauthenicationService } from '../services/userauthenication.service';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userAuthentication : UserauthenicationService , private root : AppComponent , private router : Router) { }

  ngOnInit(): void {
  }

  loginForm=new FormGroup({
    userEmailID:new FormControl(''),
    userPassword:new FormControl('')
  })

  responsetoken:any;

  decoded:any;

  userobject:any;

  login(){
    this.userAuthentication.checkUser(this.loginForm.value).subscribe(
      response=>{
      console.log(response);
      this.root.enable=true;
      this.responsetoken=response;
      console.log(this.responsetoken.token);
      const token=this.responsetoken.token;
      this.decoded= jwt_decode(token);
      console.log(this.decoded.UserObject);
      this.userobject=this.decoded.UserObject;
      localStorage.setItem('jwt',this.responsetoken.token);
      localStorage.setItem('email',this.userobject.userEmailID);
      console.log(this.userobject.userEmailID);
     if( this.userAuthentication.isLoggedIn=true){
      alert("LOGIN SUCCESS");
      this.loginForm.reset();
      this.router.navigateByUrl("/nav");
     }else {
      alert("Invalid Credentials..!!! Please try Again");
     console.error("Credentials Incorrect. Please Check.");
      }
    }
      
    )
  }
  
}
