import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class TabsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
