import { Component } from '@angular/core';
import { IonicModule, Platform } from '@ionic/angular';
import { StorageService } from './services/storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class AppComponent {
  public loaded: boolean = false;
  constructor(private platform: Platform, private storage: StorageService) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready()
      .then(() => this.storage.init())
      .then(() => this.loaded = true)
      .then(() => console.log('done init'))
      .catch(err => console.error(err));
  }
}
