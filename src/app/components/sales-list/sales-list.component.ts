import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class SalesListComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
