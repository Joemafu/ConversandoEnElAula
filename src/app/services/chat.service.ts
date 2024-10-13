import { Injectable, inject, signal } from '@angular/core';
import { Message } from '../interfaces/message.interface';
import { Observable } from 'rxjs';
import { Firestore, addDoc, collection, collectionData, query, orderBy, serverTimestamp } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private db = inject(Firestore);
  public messagesSignal = signal<Message[] | null | undefined>(undefined);
  public messages: Message[] = [];
  public messages$!: Observable<Message[]>;

  public getAll(room: string) : Observable<Message[]> {
    const col = collection(this.db, room);
    const queryCol = query(col, orderBy('date', 'asc'));
    return collectionData(queryCol, { idField: 'id' }) as Observable<Message[]>;
  }

  public async agregarMensaje(message: Message, sala: string) {
    try{
      let mensajes = collection(this.db, sala);
      let docRef = await addDoc(mensajes, { content: message.content, date: serverTimestamp(), mail: message.mail});
      return docRef.id;
    }catch(error){
      return '';
    }
  }
}