import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { UserauthenicationService } from '../services/userauthenication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  constructor(private userAuthentication : UserauthenicationService , private root : AppComponent , private router : Router){}

  ngOnInit(): void {
    
  }

  registerForm=new FormGroup({
    userEmailID:new FormControl('' , [Validators.required , Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]),
    userPassword:new FormControl('' , [Validators.required , Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")]),
    // userName:new FormControl('' , [Validators.required , Validators.pattern("^[A-Za-z]\\w{2,29}$")]),
    userName:new FormControl('' , [Validators.required , Validators.pattern("[a-zA-Z][a-zA-Z ]+")]),
    address:new FormControl('' , [Validators.required]),
    mobileNo:new FormControl('' , [Validators.required , Validators.pattern("^[0-9]*$") , Validators.minLength(10) , Validators.maxLength(12)]),
   
  })

  response : any;

  get f(){
    return this.registerForm.controls;
  }
  
  signup(){
    this.root.sinup=false;
    this.userAuthentication.registerUser(this.registerForm.value).subscribe(
      (response: any)=>{
          alert("SIGNUP SUCCESSFUL");
          console.log(response);
          this.registerForm.reset();
          this.router.navigateByUrl("/LogInView");
      }
    )
  }
  

}
