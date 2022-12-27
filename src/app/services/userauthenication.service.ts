import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserauthenicationService {

  constructor(private httpClient : HttpClient) { }

  isLoggedIn:boolean=false;
  private authenticationURL = "http://localhost:5555/authentication-app/auth";
  private registerUrl="http://localhost:5555/Kanban-Service-Application/k1";
  

  registerUser(userObject:any):Observable<any>{
    console.log(userObject);
    return this.httpClient.post(this.registerUrl+"/register" , userObject);
  }

  checkUser(userObject:any):Observable<any>{
    console.log(userObject);
    return this.httpClient.post(this.authenticationURL+"/authenticate-user" , userObject);
  }
  
}
