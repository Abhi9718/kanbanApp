import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../model/user.model';
import { KanbanboardService } from '../services/kanbanboard.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Card } from '../model/card.model';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { Column } from '../model/column.model';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddTaskComponent } from '../add-task/add-task.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {

  

  User1: User = new User;
  matDividerLength: number = 0;
  constructor(private breakpointObserver: BreakpointObserver, public taskService: KanbanboardService, public dialog: MatDialog
    , private bottomSheet: MatBottomSheet) { }
  
  ngOnInit(): void {
    if(this.taskService.currentproject == "" || null || undefined){
      this.taskService.hideDashDiv = true;
    }else{
      this.taskService.hideDashDiv = false;
    }
    this.taskService.hideDashDiv = true;
    console.log(this.taskService.hideDashDiv);
    this.taskService.findUsers().subscribe(data=> {
      this.User1= data;
      console.log(data);
      console.log("Number of columns :: ",this.User1.columnList[0].category.length)
      this.taskService.loggedUser1 = data;
      this.taskService.matDivLen = 4 * 380;
    });
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
  currentProject: Array<Column> = [];
  categories: Array<String> = [];
  tasklists: Array<Column> = [];
  taskcards: Array<any> = [];
  taskcards1: Array<Card> = [];
  todolist: Array<Card> = [];
  currentproject(){
    if(this.taskService.currentproject=="" ||null ||undefined){
      this.taskService.hideDashDiv = true;
    }else{
      this.taskService.hideDashDiv=false;
      this.currentProject=this.taskService.loggedUser1.columnList.filter(r=>r.columnName==this.taskService.currentproject);
      this.taskService.categories=this.currentProject[0].category;
      this.taskService.taskcards=this.currentProject[0].cardList;
      this.taskService.taskcards1=this.taskService.taskcards;
      this.taskService.cardnameForSearch=[];
      this.taskService.loggedUser1.columnList.filter(r=>r.columnName==this.taskService.currentproject)[0].cardList
      .filter(r=>{
        if(r.cardName!=""){
          this.taskService.cardnameForSearch.push(r.cardName);
        }
      });
    }
    this.taskService.matDivLen=this.taskService.loggedUser1.columnList.filter(r=>r.columnName==this.taskService.currentproject)[0]
    .category.length*320;
    if(this.taskService.matDivLen<4*380){
      this.taskService.matDivLen=4*380;
    }
  }
  filterProject(){}
 col:String ="blue";
 updateDashboard(){
  console.log(this.taskService.loggedUser1);
  this.taskService.updateUser(this.taskService.loggedUser1).subscribe(response=>{
    console.log(response);
  })
  this.currentProject=this.taskService.loggedUser1.columnList.filter(r=>r.columnName==this.taskService.currentproject);
  this.taskService.currentproject=this.currentProject[0].columnName;
  console.log(this.taskService.currentproject);
  this.taskService.categories=this.currentProject[0].category;
  this.taskService.taskcards=this.currentProject[0].cardList;
  this.taskService.taskcards1=this.taskService.taskcards;
 }

 checked1: Boolean = false;
 progressBar = false;
 colsinproject: Array<String | null | undefined> = [];
 currentcolumn: String | null | undefined;
 nextcolumn: String | null | undefined;



 move(cardname: String | null | undefined){
setTimeout(()=>{
  alert("moving Done");
 this.taskService.progresslist=this.taskService.loggedUser1.columnList.filter(r=>r.columnName==this.taskService.currentproject)
 [0].cardList.filter(r=>r.category=="IN-PROGRESS");
 let currentcard=this.taskService.loggedUser1.columnList.filter(r=>r.columnName==this.taskService.currentproject)[0].cardList
 .filter(r=>r.cardName==cardname)[0];

 this.nextcolumn = this.taskService.loggedUser1.columnList.filter(r => r.columnName == this.taskService.currentproject)[0].cardList
 .filter(r => r.cardName == cardname)[0].category;
this.colsinproject = this.taskService.loggedUser1.columnList.filter(r => r.columnName == this.taskService.currentproject)[0].category;

if (this.taskService.loggedUser1.columnList.filter(r => r.columnName == this.taskService.currentproject)[0].cardList
.filter(r => r.cardName == cardname)[0].category != this.colsinproject[this.colsinproject.length - 1]) {
for (let i = 0; i < this.colsinproject.length; i++) {
  if (this.taskService.loggedUser1.columnList.filter(r => r.columnName == this.taskService.currentproject)[0].cardList
    .filter(r => r.cardName == cardname)[0].category == this.colsinproject[i]) {
    this.currentcolumn = this.colsinproject[i];
    this.nextcolumn = this.colsinproject[i + 1];
    console.log(this.nextcolumn);
    }
  }
  console.log((this.taskService.progresslist.filter(r => r.cardAssignee == currentcard.cardAssignee)));
  if ((this.nextcolumn == "IN-PROGRESS")
    && (currentcard.category == "TODO")
    && (this.taskService.progresslist.filter(r => r.cardAssignee == currentcard.cardAssignee)).length > 0) {

    
    this.dialog.open(InfoDialogComponent, {
      data: {
        card: "user " + currentcard.cardAssignee +
          " already has a task in progress", flag: false, flag2: false
      }
});
}else{
  this.taskService.loggedUser1.columnList.filter(r => r.columnName == this.taskService.currentproject)[0].cardList
  .filter(r => r.cardName == cardname)[0].category = this.nextcolumn;

let response = this.taskService.updateUser(this.taskService.loggedUser1);
response.subscribe(data => {
  this.taskService.loggedUser1 = data;

});
}
}
this.updateDashboard();
}, 1186)
 }

 move1(cardname: String | null | undefined) {
  setTimeout(() => {
    alert("Moving done");
    this.nextcolumn = this.taskService.loggedUser1.columnList.filter(r => r.columnName == this.taskService.currentproject)[0].cardList
      .filter(r => r.cardName == cardname)[0].category;
    this.colsinproject = this.taskService.loggedUser1.columnList.filter(r => r.columnName == this.taskService.currentproject)[0].category;
  
    if (this.taskService.loggedUser1.columnList.filter(r => r.columnName == this.taskService.currentproject)[0].cardList
    .filter(r => r.cardName == cardname)[0].category != this.colsinproject[0]) {
    for (let i = 0; i < this.colsinproject.length; i++) {
      if (this.taskService.loggedUser1.columnList.filter(r => r.columnName == this.taskService.currentproject)[0].cardList
        .filter(r => r.cardName == cardname)[0].category == this.colsinproject[i]) {
        this.currentcolumn = this.colsinproject[i];
        this.nextcolumn = this.colsinproject[i - 1];
        console.log(this.nextcolumn);
      }
    }
    this.taskService.loggedUser1.columnList.filter(r => r.columnName == this.taskService.currentproject)[0].cardList
          .filter(r => r.cardName == cardname)[0].category = this.nextcolumn;

        let response = this.taskService.updateUser(this.taskService.loggedUser1);
        response.subscribe(data => {
          this.taskService.loggedUser1 = data;

        });
      }
      this.updateDashboard();
    }, 1186)
}

delete(cardname: String | null | undefined) {
  setTimeout(() => {
    alert("deleted Succesfully");
    const tlist = this.taskService.loggedUser1.columnList.filter(r => r.columnName == this.taskService.currentproject)[0].cardList
      .filter(r => r.cardName != cardname);
    this.taskService.loggedUser1.columnList.filter(r => r.columnName == this.taskService.currentproject)[0].cardList = tlist;
    let response = this.taskService.updateUser(this.taskService.loggedUser1);
    response.subscribe(data => {
      this.taskService.loggedUser1 = data;
      console.log(this.taskService.loggedUser1);
    });
    this.updateDashboard();
  }, 1186)
}
card: Card | null | undefined;
editcard(cardname: String | null | undefined) { 
  setTimeout(() => {
    this.card = this.taskService.loggedUser1.columnList.filter(r => r.columnName == this.taskService.currentproject)[0]
      .cardList.filter(r => r.cardName == cardname)[0];
    this.dialog.open(TaskDialogComponent, { width: "400px", data: { card: this.card, flag: true } });
  }, 1186)
}

columnform = new FormGroup({
  columnname: new FormControl('', Validators.required)
});
step: number | undefined;
setStep(index: number) {
  this.step = index;
}

addcolumn() {
  setTimeout(() => {
    alert("Column added successfully");
    console.log(this.columnform.value.columnname);
    if (this.taskService.loggedUser1.columnList.filter(r => r.columnName == this.taskService.currentproject)[0].category
      .filter(r => r == this.columnform.value.columnname).length > 0) {
      this.dialog.open(InfoDialogComponent, {width:"600px",height:"170px", data: { card: "Duplicate column name! try with diffrent name.", flag: false } });
    } else {
      this.taskService.loggedUser1.columnList.filter(r => r.columnName == this.taskService.currentproject)[0].category.push(
        this.columnform.value.columnname
      );
      let response = this.taskService.updateUser(this.taskService.loggedUser1);
      response.subscribe(data => {
        this.taskService.loggedUser1 = data;
        console.log(this.taskService.loggedUser1);
      });
      this.step = 1;
      this.User1 = this.taskService.loggedUser1;
      this.taskService.matDivLen = this.taskService.loggedUser1.columnList.filter(r => r.columnName == this.taskService.currentproject)[0].category.length * 310;
      if (this.taskService.matDivLen < 4 * 380) {
        this.taskService.matDivLen = 4 * 380;
      }
      this.updateDashboard();
    }
  }, 1186)
}

deleteProject(projectname: String | null | undefined) {
  setTimeout(() => {
   alert("project deleted");
    const tasklist = this.taskService.loggedUser1.columnList.filter(r => r.columnName != projectname);
    this.taskService.loggedUser1.columnList = tasklist;
    let response = this.taskService.updateUser(this.taskService.loggedUser1);
    response.subscribe(data => {
      this.taskService.loggedUser1 = data;
      console.log(this.taskService.loggedUser1);
    });
    this.taskService.currentproject = "";
    this.taskService.hideDashDiv = true;
  }, 1186)
}

project1: Column | null | undefined;
  updateProject(projectname: String | null | undefined) {
    setTimeout(() => {
      alert("updated project");
      this.project1 = this.taskService.loggedUser1.columnList.filter(r => r.columnName == projectname)[0];
      this.dialog.open(AddTaskComponent, {
        width: "400px",
        data: { project: this.project1, flag: true }
      })
    }, 1186)
  }
  tempuser: User = new User;
  remaindercards: Array<Card> = [];
  remaindercategories: Array<String | null | undefined> = [];
  deleteColumn(name: String | null | undefined) {
    setTimeout(() => {
      alert("column deleted");
      console.log(name);
      this.remaindercards = this.taskService.loggedUser1.columnList.filter(r => r.columnName == this.taskService.currentproject)[0].cardList
        .filter(r => r.category != name);
      this.taskService.loggedUser1.columnList.filter(r => r.columnName == this.taskService.currentproject)[0].cardList =
        this.remaindercards;
      this.remaindercategories = this.taskService.loggedUser1.columnList.filter(r => r.columnName == this.taskService.currentproject)[0]
        .category.filter(r => r != name);
      this.taskService.loggedUser1.columnList.filter(r => r.columnName == this.taskService.currentproject)[0]
        .category = this.remaindercategories;
      let response = this.taskService.updateUser(this.taskService.loggedUser1);
      response.subscribe(data => {
        this.taskService.loggedUser1 = data;
        console.log("Updated delete column");
      });
      this.taskService.matDivLen = this.taskService.loggedUser1.columnList.filter(r => r.columnName == this.taskService.currentproject)[0].category.length * 380;
      if (this.taskService.matDivLen < 4 * 380) {
        this.taskService.matDivLen = 4 * 380;
      }
      this.updateDashboard();
    }, 1186)

  }
  infoCard(cardname: String | null | undefined) {
    setTimeout(() => {
      this.card = this.taskService.loggedUser1.columnList.filter(r => r.columnName == this.taskService.currentproject)[0]
        .cardList.filter(r => r.cardName == cardname)[0];
      this.dialog.open(InfoDialogComponent, { width: "770px", height: "480px", data: { card: this.card, flag: true } });
    }, 1186)

  }
  search: String = "";
  searchMethod() {
    this.infoCard(this.search);
    this.search = "";
  }
  moveTo(name: String | null | undefined, categ: String | null | undefined) {
    this.move(name);
  }
}