import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class SettingsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
