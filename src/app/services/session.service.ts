import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthServiceService } from './auth-service.service';


export interface Isession {
  sessionDate:string;
  title:string;
  reflection:string;
  rating:number;
  isRevised:boolean;
  userID: string;
}
 export interface IsessionID extends Isession {
  id: string;
 }

//  export interface IsessionUpload extends Isession {
//    date: Date;
//  }


@Injectable({
  providedIn: 'root'
})
export class SessionService {
  sessionCollection: AngularFirestoreCollection<Isession>;
  sessions: Observable<Isession[]>;
  user;

  constructor(
    private auth: AuthServiceService,
    private afs:AngularFirestore) {
      this.user = this.auth.user;

      this.sessionCollection = this.afs.collection('sessions', (ref) => {
        return ref.where('userID', '==', this.user.uid)
        .orderBy('date', 'desc')
      });
      
      this.sessions =this.sessionCollection.snapshotChanges()
      .pipe(map(this.includeCollectionID));
    }

    includeCollectionID(docChangeAction){
      return docChangeAction.map((a) => {
         const data = a.payload.doc.data();
         const id = a.payload.doc.id;
         return { id, ...data};
      });
    }

    handleError(error: Error){
      console.log(error);
    }

    upload(session: Isession){
      // const payload :IsessionUpload = {date: new Date(), ...session};
      const payload = {
        userID: this.user.uid, 
        isRevised: false,
        ...session
      };
      return this.sessionCollection.add(payload)
      .catch(this.handleError);
    }

    delete(session: IsessionID){
      console.log(session);
      this.sessionCollection.doc(session.id).delete();

    }

    update(session: IsessionID){
      this.sessionCollection.doc(session.id).update({
        isRevised: session.isRevised
      });
    }


}
