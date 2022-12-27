import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../model/card.model';
import { LoginUser } from '../model/login-user.model';
import { User } from '../model/user.model';


@Injectable({
  providedIn: 'root'
})
export class KanbanboardService {
  loggedUser1: User = new User;
  loggedIn: boolean = false;
  loggedinuser: String | undefined | null=localStorage.getItem('email');
  currentproject: String | undefined | null;
  categories: Array<String | null | undefined> = [];
  taskcards: Array<any> = [];
  taskcards1: Array<Card> = [];
  todolist: Array<Card> = [];
  progresslist: Array<Card> = [];
  validatelist: Array<Card> = [];
  completelist: Array<Card> = [];
  hideDashDiv: boolean = false;
  matDivLen: number = 0;
  projectDue: String | null | undefined;
  cardnameForSearch: Array<String | null | undefined> = [];
  

  constructor(private http: HttpClient) { }
  
  apiUrl1 ="http://localhost:5555/Kanban-Service-Application/k1/get-all-users";
  apiUrl2 ="http://localhost:5555/Kanban-Service-Application/k1/find-user";
  apiUrl3 ="http://localhost:5555/Kanban-Service-Application/k1/update-user";

  sendEmail(url: string, data: any) {
    return this.http.post(url, data);
  }

  getAllUsers() : Observable<Array<LoginUser>>{
    return this.http.get<Array<LoginUser>>(this.apiUrl1);
 }

 findUsers() : Observable<User>{
  return this.http.get<User>(`${this.apiUrl2}/${this.loggedinuser}`); 
 }
 
 updateUser(user: User): Observable<User> {
  return this.http.put<User>(this.apiUrl3, user);
}

}
