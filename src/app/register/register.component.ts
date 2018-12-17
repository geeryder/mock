import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errorMesaage: string;

  constructor(
    private router: Router,
    private auth: AuthServiceService) { }

    register(details: {email:string, password:string}){
      console.log(details.email, details.password);

      this.auth.register(details.email, details.password)
      .then(()=>{
        this.router.navigate(['/home']);
        //redirects to home page (telling it what to do )
      })
      .catch((error:Error)=>{
        this.errorMesaage =error.message;
        //catching the error (using the error message in the console.)
      })
    }

  
  ngOnInit() {
  }

}
