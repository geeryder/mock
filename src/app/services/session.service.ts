import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export interface Isession {
  sessionDate:string;
  title:string;
  reflection:string;
  rating:number;
}
 export interface IsessionID extends Isession {
  id:string;
 }

 export interface IsessionUpload extends Isession {
   date: Date;
 }

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  sessionCollection: AngularFirestoreCollection<Isession>;
  sessions: Observable<Isession[]>;

  constructor(
    private afs:AngularFirestore) {
      this.sessionCollection = this.afs.collection('sessions');
      
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
      return this.sessionCollection.add(session)
      .catch(this.handleError);
    }

    delete(session: IsessionID){
      console.log(session);
      this.sessionCollection.doc(session.id).delete();

    }



}
