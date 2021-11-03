import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialogo-color',
  templateUrl: './dialogo-color.component.html',
  styleUrls: ['./dialogo-color.component.css']
})
export class DialogoColorComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogoColorComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,private _snackBar: MatSnackBar) { }

    onNoClick(): void {
      this.dialogRef.close({color: this.data.correo});
      
    }
  ngOnInit() {
  }

}
