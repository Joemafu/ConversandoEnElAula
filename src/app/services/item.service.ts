import { inject, Injectable } from '@angular/core';
/* import { Firestore, collection, query, getDocs, addDoc, updateDoc, doc } from '@angular/fire/firestore'; */
import { Observable, from } from 'rxjs';
import { Item } from '../interfaces/item';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

/*   private readonly PATH = 'items';
  firestore: Firestore = inject(Firestore); */

  constructor() {}

  /* obtenerItems(): Observable<Item[]> {
    const colRef = collection(this.firestore, this.PATH);
    const q = query(colRef);
    return from(getDocs(q)).pipe(
      map(querySnapshot => querySnapshot.docs.map(docSnap => docSnap.data() as Item))
    );
  } */

/*   agregarItem(item: Item): Observable<void> {
    const colRef = collection(this.firestore, this.PATH);
    return from(addDoc(colRef, item)).pipe(map(() => {}));
  } */

/*   actualizarItem(item: Partial<Item>): Observable<void> {
    const docRef = doc(this.firestore, `${this.PATH}`);
    return from(updateDoc(docRef, item)).pipe(map(() => {}));
  } */
}