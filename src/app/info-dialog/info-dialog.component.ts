import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Card } from '../model/card.model';
import { KanbanboardService } from '../services/kanbanboard.service';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.css']
})
export class InfoDialogComponent implements OnInit {

  constructor(private taskservice:KanbanboardService,
    @Inject(MAT_DIALOG_DATA)public data:any|null) 
  {
  this.card=data.card;
 }
 card:Card;
  ngOnInit(): void {
    console.log(this.card);
  }
}
