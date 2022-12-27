import { Injectable } from '@angular/core';
import { UserauthenicationService } from '../services/userauthenication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getToken: any;

  constructor(private auhenticationservice : UserauthenicationService) { }
  
  isLoggedIn(){
    return this.getToken();
  }

  setToken(token:string){
    localStorage.setItem('token' , token);
  }

  getoken(){
    return localStorage.getItem('token');
  }

  setEmailID(EmailID:string){
    localStorage.setItem('EmailID' , EmailID);
  }

  getEmailID(){
    return localStorage.getItem('EmailID');
  }

  clear(){
    localStorage.clear();
  }
}
