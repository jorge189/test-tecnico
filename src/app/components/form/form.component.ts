import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {MatSnackBar} from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
// import firebase from 'firebase/';
import { auth } from 'firebase/app'; 
import 'firebase/auth';
import firebase from '@firebase/app';
import { Router } from '@angular/router';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { DialogoColorComponent } from 'src/app/dialogos/dialogo-color/dialogo-color.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input() action:string;

  email = 'jorge@example.com';
  pass = '123456';
  color:string = "#CD5C5C"
  constructor(
    public MatDialog: MatDialog,
    public auth: AngularFireAuth,
    private _snackBar: MatSnackBar,
    private router: Router) { }
    

  ngOnInit() {
    console.log(this.action);
  }

  loginWith() {
    this.auth.auth.signInWithPopup(new auth.GoogleAuthProvider);
  }
  logout() {
    this.auth.auth.signOut();
  }
  showData(){
    this.auth.user.subscribe( res => {
      if (res == null) {
        this._snackBar.open("Aun no hay registros", "cerrar", {
              duration: 5000,
             });
       
        // Swal.fire('Aun no hay data')
      }
      else{
        this.router.navigate(['profile']);
        this.saveSesion(res.email,res.uid)
        console.log(res);
      }
    });
  }

  register(){
    this.auth.auth.createUserWithEmailAndPassword(this.email,this.pass)
    .then((user) => {
      
      console.log(user);
    
      Swal.fire(`${user.user.email} : REGISTRADO CON EXITO`)
      this.saveSesion(this.email,this.pass)
      this.router.navigate(['profile']);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Swal.fire(errorCode,': ',errorMessage);
      console.log(errorCode,': ',errorMessage);
    });
  }

  customLogin(){
    this.auth.auth.signInWithEmailAndPassword(this.email,this.pass)
    .then( res => {
      console.log(res);
    })
    .catch(err => {console.log('Error cl:',err)
    Swal.fire('Error: ',err.message);
  console.log('Error cl:',err)
  } );
  }
  saveSesion(email,uuid) {
  sessionStorage.setItem('user',email);
  sessionStorage.setItem('uuid',uuid);
  }
 
}
