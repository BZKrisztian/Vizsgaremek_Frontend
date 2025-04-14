import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-confirmdeldialog',
  templateUrl: './confirmdeldialog.component.html',
  styleUrls: ['./confirmdeldialog.component.css'],
  imports: [
    MatDialogModule, TranslateModule]
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
