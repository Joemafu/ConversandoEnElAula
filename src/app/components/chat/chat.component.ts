import { ElementRef, Component, OnInit, OnDestroy, inject, ViewChild, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { Message } from '../../interfaces/message.interface';
import { Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { IonFab, IonFabButton, IonIcon, IonContent, IonSpinner, IonGrid, IonRow, IonCol, IonButton } from "@ionic/angular/standalone";
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [IonButton, IonCol, IonRow, IonGrid, IonSpinner, IonContent, IonIcon, IonFabButton, IonFab,  FormsModule, AsyncPipe, CommonModule ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit, OnDestroy  {

  protected messages: Message[] = [];
  protected message: string = '';
  private user: string = '';
  private router = inject(Router);
  private chatService = inject(ChatService);
  private authService = inject(AuthService);
  private chatSubscription: Subscription = new Subscription();
  private authSubscription: Subscription = new Subscription();

  @ViewChild('chatBox') chatBox!: ElementRef;
  @Input() public room: string = '';

  loading = true;

  ngOnInit() {

    this.selectRoom();

    this.authSubscription = this.authService.user$.subscribe((user) => {
      if (user) {
        this.user = user.email!;
      } else {
        this.user="";     
      }
    });
    
    this.chatSubscription = this.chatService.messages$.subscribe((mensajes) => {
      if(mensajes) {
        this.messages = mensajes;
        this.loading = false;
        this.scrollDown();
      }
      else {
        this.messages = [];
      }
    });
  }

  scrollDown() {
    setTimeout(() => {
      if (this.chatBox) {
        this.chatBox.nativeElement.scrollTop = this.chatBox.nativeElement.scrollHeight;
      }
    }, 100);
  }

  ngOnDestroy(): void {
    this.chatSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
    this.room = '';
  }

  protected sendMessage() {
    if(this.message.length > 100) {
      this.message = this.message.slice(0,100);
      Swal.fire({
        position: "center",
        icon: 'error',
        title: 'Ups!',
        text: 'El mensaje no puede superar los 100 caracteres',
        heightAuto: false,
        background: '#9955b4',
        showConfirmButton: false,
        timer: 2200,
        color: 'white'
      });
    } else if (this.message != '') {
      if(this.authService.currentUserSig() != null)
      {
        const obj: Message = {
          content: this.message,
          date: '',
          mail: this.user
        }

        this.chatService.agregarMensaje(obj, this.room).then(() => {
          this.message = '';
        })
      }
      else
      {
        this.router.navigateByUrl('/login');
      }
    }    
  }

  esMensajeUsuarioActual(mensaje: Message): boolean {
    return mensaje.mail === this.user;
  }

  formatearHora(timestamp: any): string {

    if(timestamp != null) {
      const date = timestamp.toDate();

      const day = date.getDate();
      const month = date.getMonth() + 1; 
      const year = date.getYear();

      const formattedDay = ('0' + day).slice(-2);
      const formattedMonth = ('0' + month).slice(-2);
      const formattedYear = ('0' + year).slice(-2);

      const hour = date.getHours();
      const minutes = date.getMinutes();

      const formattedHour = ('0' + hour).slice(-2);
      const formattedMinutes = ('0' + minutes).slice(-2);

      const formattedDate = `${formattedDay}/${formattedMonth}/${formattedYear} - ${formattedHour}:${formattedMinutes}`;

      return formattedDate;
    }
    else {
      return '';  
    }
  }

  logout() {
    this.authService.logout();
  }

  goHome() {
    this.router.navigateByUrl('/home');
    this.ngOnDestroy();
  }

  selectRoom() {
    this.chatService.messages$ = this.chatService.getAll(this.room);
  }
}