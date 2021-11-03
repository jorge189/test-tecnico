import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { DialogoColorComponent } from 'src/app/dialogos/dialogo-color/dialogo-color.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  nombre:string;
color:string = "#CD5C5C"
  constructor(public auth: AngularFireAuth,public MatDialog: MatDialog,) { }

  ngOnInit() {
  }

  editar(){
    this.auth.auth.currentUser.updateProfile({
      displayName:this.nombre
    });
  }
  openDialog(): void {
    const dialogRef = this.MatDialog.open(DialogoColorComponent, {
      data:{
      color: this.color
      }
     
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.color = result;
      
      console.log(result);
     this.getcolor(this.color)
     
      
      
   
  });
}
getcolor(color) {
  return `${color}`;

}
}
