import { Injectable, inject } from '@angular/core';
/* import { Firestore, collection, addDoc, collectionData, query, orderBy } from '@angular/fire/firestore';
import { Timestamp } from '@angular/fire/firestore'; */
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  /* private firestore: Firestore = inject(Firestore);

  constructor() {} */

  /* logUserLogin(userId: string) {
    const loginEvent = {
      userId: userId,
      timestamp: Timestamp.now()
    };
    const loginsCollection = collection(this.firestore, 'logins');
    return addDoc(loginsCollection, loginEvent);
  } */

  /* getUserLogins(): Observable<any[]> {
    const loginsCollection = collection(this.firestore, 'logins');
    const loginsQuery = query(loginsCollection, orderBy('timestamp', 'desc'));
    return collectionData(loginsQuery);
  } */
}
