import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, CommonModule],
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  isSplashVisible = true;

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.isSplashVisible = false;
    }, 5000);
  }
}
