import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map, Observable, shareReplay } from 'rxjs';
import { AddTaskComponent } from '../add-task/add-task.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Card } from '../model/card.model';
import { Column } from '../model/column.model';
import { User } from '../model/user.model';
import { KanbanboardService } from '../services/kanbanboard.service';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

interface Animal {
  name: string;
  sound: string;
}

@Component({
  selector: 'app-navcomp',
  templateUrl: './navcomp.component.html',
  styleUrls: ['./navcomp.component.css']
})
export class NavcompComponent implements OnInit {

  animalControl = new FormControl<Animal | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  animals: Animal[] = [
    {name: 'Manas', sound: 'manas@gmail.com'},
    {name: 'Abhishek', sound: 'abi@gmail.com'},
    {name: 'punith', sound: 'punith@gmail.com'},
    {name: 'manoj', sound: 'manoj@gmail.com'},
    {name: 'admin', sound: 'admin@gmail.com'},
    {name: 'maintainer', sound: 'maintainer@gmail.com'},
    {name: 'newuser', sound: 'user@gmail.com'},
  ];

  isHandSet$: Observable<boolean>=this.BreakpointObserver.observe(Breakpoints.Handset)
  .pipe (
    map(result => result.matches),
      shareReplay()
    );


  constructor(private BreakpointObserver:BreakpointObserver,public taskService:KanbanboardService,private route:Router,
    public dialog:MatDialog,private dash:DashboardComponent) { }
  users: User =new User;
  ngOnInit(): void {
    if(this.taskService.loggedIn==true)
    {
      this.taskService.findUsers().subscribe(data=>{
        this.users=data;
      });
    }
  }
    hide:boolean=false;

    logout(){
      this.hide=false;
      this.taskService.loggedIn=false;
      //localStorage.removeItem('jwt');
      this.taskService.findUsers().subscribe(data=> {
        this.users= data;
        console.log(data);
      });
      this.route.navigate(["/"]);
    }

    date : String| null | undefined;
  dynamic: number =0;
  addTask(){
    let taskcard: Card =new Card;
    taskcard.cardName=null;
    taskcard.category=null;
    taskcard.description=null;
    taskcard.taskPriority=null;
    taskcard.cardAssignee=null;
    this.dialog.open(TaskDialogComponent,{
      width:"400px",
      data: { card:taskcard, flag: false}
    });
    this.taskService.cardnameForSearch = [];
    this.taskService.loggedUser1.columnList.filter(r=>r.columnName==this.taskService.currentproject)[0].cardList
    .filter(r=>{
      if(r.cardName !=""){
        this.taskService.cardnameForSearch.push(r.cardName);
      }
    });
  }

    newproject =new Column;
    add(){
      this.newproject.columnName=null;
      this.newproject.projectPriority=null;
      this.newproject.date=null;
      this.newproject.cardList=[];
      this.newproject.category=[];
      this.newproject.listOfUsers=[];
      this.dialog.open(AddTaskComponent,{
        width:"400px",
        data:{project:this.newproject,flag:false}
      });
    }
    
    project(projectName:String|undefined|null){
      this.taskService.currentproject=projectName;
      this.taskService.hideDashDiv=false;
      console.log(this.taskService.currentproject);
      this.date=this.taskService.loggedUser1.columnList.filter(r=>r.columnName==this.taskService.currentproject)[0].date;
      this.taskService.matDivLen=this.taskService.loggedUser1.columnList.filter(r=>r.columnName==this.taskService.currentproject)[0]
      .category.length*320;
      this.taskService.projectDue=this.date?.slice(0,10);
      this.dash.currentproject();
    }

    deleteProject(projectname:String|null|undefined){
      const columnList=this.taskService.loggedUser1.columnList.filter(r=>r.columnName!=projectname);
      this.taskService.loggedUser1.columnList=columnList;
      let response=this.taskService.updateUser(this.taskService.loggedUser1);
      response.subscribe(data=>{
        this.taskService.loggedUser1=data;
        console.log(this.taskService.loggedUser1);
      });
      this.taskService.currentproject="";
      this.taskService.hideDashDiv=true;
    }
    filterHigh(){
      this.taskService.taskcards1=this.taskService.loggedUser1.columnList.filter(r=>r.columnName==this.taskService.currentproject)[0]
      .cardList.filter(r=>r.taskPriority=="HIGH");
    }
    filterLow(){
      this.taskService.taskcards1=this.taskService.loggedUser1.columnList.filter(r=>r.columnName==this.taskService.currentproject)[0]
      .cardList.filter(r=>r.taskPriority=="LOW");
    }
    filterUrgent(){
      this.taskService.taskcards1=this.taskService.loggedUser1.columnList.filter(r=>r.columnName==this.taskService.currentproject)[0]
      .cardList.filter(r=>r.taskPriority=="URGENT");
    }
    filterNormal(){
      this.taskService.taskcards1=this.taskService.loggedUser1.columnList.filter(r=>r.columnName==this.taskService.currentproject)[0]
      .cardList.filter(r=>r.taskPriority=="NORMAL");
    }
    filterNone(){
      this.taskService.taskcards1=this.taskService.loggedUser1.columnList.filter(r=>r.columnName==this.taskService.currentproject)[0]
      .cardList;
    }



}
