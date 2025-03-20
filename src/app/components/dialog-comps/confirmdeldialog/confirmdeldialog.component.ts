import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmdeldialog',
  templateUrl: './confirmdeldialog.component.html',
  styleUrls: ['./confirmdeldialog.component.css'],
  template: `
  <h2 matdialogtitle>{{}}</h2>
  <matdialogcontent>{{}}</matdialogcontent>
  <matdialogactions align="end">
    <button mat-button (click)="onCancel()">Cancel</button>
    <button mat-button color="warn" (click)="onDeleteConfirm()">Confirm</button>
  </matdialogactions>
  `
})
export class ConfirmdeldialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmdeldialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {title: string, message: string}
  ) { }

  ngOnInit() {
  }
  onDeleteConfirm():void{
    this.dialogRef.close(true);
  }
  onCancel():void{
    this.dialogRef.close(false);
  }

}
