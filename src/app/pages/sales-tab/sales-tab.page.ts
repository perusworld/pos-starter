import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@Component({
  selector: 'app-sales-tab',
  templateUrl: './sales-tab.page.html',
  styleUrls: ['./sales-tab.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class SalesTabPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
