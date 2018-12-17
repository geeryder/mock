import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage:string

  constructor( 
    private auth: AuthServiceService,
    private router: Router) { }

    login(details: {email:string, password:string}){
     this.auth.login(details.email, details.password)
     .then(()=>{
       this.router.navigate(['home']);
     })
     .catch((error: Error)=>{
       this.errorMessage =error.message
     })

    }

  ngOnInit() {
  }

}
