import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user;
  items: Observable<any>
  itemCollection: AngularFirestoreCollection;

  constructor( 
    private auth: AuthServiceService,
    private afs: AngularFirestore
  ) { 

  
  }

  logout(){
    this.auth.logout();
  }

  ngOnInit() {
  }

}
