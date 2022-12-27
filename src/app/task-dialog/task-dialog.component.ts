import { Component, Inject, NgIterable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { Card } from '../model/card.model';
import { Column } from '../model/column.model';
import { User } from '../model/user.model';
import { KanbanboardService } from '../services/kanbanboard.service';


interface Animal {
  name: string;
  sound: string;
}

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent implements OnInit {
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


  constructor(private taskService : KanbanboardService, private  dash : DashboardComponent,
    @Inject(MAT_DIALOG_DATA)public data:any|null,public dialog:MatDialog) 
    {
      this.card=data.card;
     }
  user:User=new User;
  users:Array<String>|Array<User>|null|undefined|NgIterable<String>=[];
  users1:Array<Column>=[]
  users2:Array<any>=[];
  card : Card;
  categories1:Array<String|null|undefined>=[];

  ngOnInit(): void {
    this.taskService.findUsers().subscribe(data=>{
      this.user=data;
    });
    this.users1=this.taskService.loggedUser1.columnList.filter(r=>r.columnName==this.taskService.currentproject);
    this.users2=this.users1[0].listOfUsers;
    this.taskService.loggedUser1.columnList.filter(r=>r.columnName==this.taskService.currentproject)[0].category
    .filter(r=>{
      if(r!=""){
          this.categories1.push(r);
      }
    });
  }
  newtaskform=new FormGroup({
    cardName:new FormControl('',Validators.required),
    taskPriority:new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    category: new FormControl('',Validators.required),
    cardAssignee: new FormControl('',Validators.required)
  });
  currentProject:Array<Column>=[];
  add(){
    if(this.taskService.loggedUser1.columnList.filter(r=>r.columnName==this.taskService.currentproject)[0].cardList
    .filter(r=>r.cardName==this.newtaskform.value.cardName).length>0){
      this.dialog.open(InfoDialogComponent,{width:"600px",height:"200px",data:{card:
      "task name already exists...!!!   please tyr again with the different name",
    flag:false}});
    }
    else{
      this.taskService.loggedUser1.columnList.filter(r=>r.columnName==this.taskService.currentproject)[0].cardList.push({
        cardName: this.newtaskform.value.cardName,
        taskPriority: this.newtaskform.value.taskPriority,
        description:this.newtaskform.value.description,
        category: this.newtaskform.value.category,
        cardAssignee:this.newtaskform.value.cardAssignee
      });
      let response=this.taskService.updateUser(this.taskService.loggedUser1);
      response.subscribe(data=>{
        console.log(data);
        this.taskService.loggedUser1=data;
        console.log(this.taskService.loggedUser1);
      });
      this.dash.updateDashboard();
    }
  }
  update(){
    this.taskService.loggedUser1.columnList.filter(r=>r.columnName==this.taskService.currentproject)[0]
    .cardList.filter(r=>r.cardName==this.card.cardName)[0].cardName=this.newtaskform.value.cardName;
    this.taskService.loggedUser1.columnList.filter(r=>r.columnName==this.taskService.currentproject)[0]
    .cardList.filter(r=>r.cardName==this.card.cardName)[0].category=this.newtaskform.value.category;
    this.taskService.loggedUser1.columnList.filter(r=>r.columnName==this.taskService.currentproject)[0]
    .cardList.filter(r=>r.cardName==this.card.cardName)[0].description=this.newtaskform.value.description;
    this.taskService.loggedUser1.columnList.filter(r=>r.columnName==this.taskService.currentproject)[0]
    .cardList.filter(r=>r.cardName==this.card.cardName)[0].taskPriority=this.newtaskform.value.taskPriority;
    this.taskService.loggedUser1.columnList.filter(r=>r.columnName==this.taskService.currentproject)[0]
    .cardList.filter(r=>r.cardName==this.card.cardName)[0].cardAssignee=this.newtaskform.value.cardAssignee;
    let response=this.taskService.updateUser(this.taskService.loggedUser1);
    response.subscribe(data=>{
      console.log(data);
      this.taskService.loggedUser1=data;
      console.log(this.taskService.loggedUser1);
    });
     this.dash.updateDashboard();
  }

}
