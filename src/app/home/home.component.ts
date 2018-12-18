import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Observable } from 'rxjs';
import { SessionService, Isession, IsessionID } from '../services/session.service';
import { AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user;
  sessions: Observable<Isession[]>;
  sessionCollection: AngularFirestoreCollection;

  constructor( 
    private auth: AuthServiceService,
    private sessionService: SessionService,
    
  ) { 
    this.sessions = this.sessionService.sessions;
    
  }

  logout(){
    this.auth.logout();
  }

  upload(session: Isession){
    this.sessionService.upload(session)
    }

  delete(session: IsessionID){
    this.sessionService.delete(session);
  }

  update(session: IsessionID){
    this.sessionService.update(session);
  }


  ngOnInit() {
  }

}
