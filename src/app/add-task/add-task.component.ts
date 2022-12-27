import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { Card } from '../model/card.model';
import { Column } from '../model/column.model';
import { User } from '../model/user.model';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { KanbanboardService } from '../services/kanbanboard.service';
import { MatChipInputEvent } from '@angular/material/chips';

interface Animal {
  name: string;
  sound: string;
}

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {


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

  constructor(private taskService:KanbanboardService,@Inject(MAT_DIALOG_DATA)public data:any|null,public dialog:MatDialog) { 
    console.log(data);
   this.project1=data.project;
   this.fruits=data.project.listOfUsers;
  }
  project1:Card | undefined|null;
  currentuser=new User;

  ngOnInit(): void {
    this.taskService.findUsers().subscribe(data=>{
      this.currentuser=data;
      console.log(this.currentuser)
    });
  }
  newprojectform= new FormGroup({
    projectName:new FormControl('',Validators.required),
    date:new FormControl('',Validators.required),
    priority:new FormControl('',Validators.required),
    projectmembers:new FormControl('',Validators.required)
  });
   
  newtasklist=new Column;
  add(){
    if(this.currentuser.columnList.filter(r=>r.columnName==this.newprojectform.value.projectName).length>0){
        this.dialog.open(InfoDialogComponent,{width:"600px",height:"200px", data:{card:
          "Project with name already exists.Please try with a different name, or for project requiring same name try numbering."
        ,flag:false,flag2:false}});
    }else{
    this.newtasklist.columnName=this.newprojectform.value.projectName;
    this.newtasklist.date=this.newprojectform.value.date;
    this.newtasklist.projectPriority=this.newprojectform.value.priority;
    this.newtasklist.category=[];
    this.newtasklist.cardList=[];
    this.newtasklist.listOfUsers=[];
    this.currentuser.columnList.push({
      columnName: this.newprojectform.value.projectName,
      category: [],
      date: this.newprojectform.value.date,
      cardList: [],
      projectPriority: this.newprojectform.value.priority,
      listOfUsers: this.fruits
    });
    console.log(this.currentuser);
    let response=this.taskService.updateUser(this.currentuser);
    response.subscribe((data)=>console.log(data));
    this.taskService.loggedUser1=this.currentuser;
    alert("added project successfully");
  }
  }
  tempcurrentuser:User=new User;
   
  update(){
    this.tempcurrentuser=this.currentuser;
    this.tempcurrentuser.columnList=this.taskService.loggedUser1.columnList.filter(r=>r.columnName!=this.data.project.columnName);
    this.newtasklist.columnName=this.newprojectform.value.projectName;
    this.newtasklist.date=this.newprojectform.value.date;
    this.newtasklist.projectPriority=this.newprojectform.value.priority;
    this.tempcurrentuser.columnList.push({
      columnName: this.newprojectform.value.projectName,
      category: [],
      date: this.newprojectform.value.date,
      cardList: this.taskService.loggedUser1.columnList.filter(r=>r.columnName==this.data.project.columnName)[0].cardList,
      projectPriority: this.newprojectform.value.priority,
      listOfUsers: this.fruits
    });
    this.currentuser=this.tempcurrentuser;
    let response=this.taskService.updateUser(this.currentuser);
    response.subscribe((data)=>console.log(data));
    this.taskService.loggedUser1=this.currentuser;
    this.taskService.currentproject=this.taskService.loggedUser1.columnList.filter(r=>r.columnName==this.newtasklist.columnName)[0].columnName;
  }
  addOnBlur = true;
  readonly separatorKeysCodes= [ENTER, COMMA] as const;
  fruits: String[] = [];

  add1(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.fruits.push(value);
    }
    event.chipInput!.clear();
  }
  remove(fruit: String): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

}
