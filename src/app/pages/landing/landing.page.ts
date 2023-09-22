import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/services/model';
import { OrderService } from 'src/app/services/order.service';
import { StorageService } from 'src/app/services/storage.service';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class LandingPage implements OnInit {

  public data = {
    cart: undefined as Cart | undefined
  }

  constructor(private orderSvc: OrderService, public ctx: StorageService) { }

  async ionViewWillEnter() {
    this.data.cart = await this.orderSvc.currentOrder();
  }

  async ngOnInit() {
  }

}
