import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  get user(){
    return this.afAuth.auth.currentUser;
  }

  get isLoggedIn():boolean{
    return (this.user) ? true:false;
  }

  register(email:string, password:string){
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  login(email:string, password:string){
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout(){
    return this.afAuth.auth.signOut()
    .then(()=>{
      this.router.navigate(['login']);
    })
    .catch((error:Error)=>{
      console.log(error);
      throw error
    });


  }


  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

}
