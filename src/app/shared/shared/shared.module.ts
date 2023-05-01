import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TitleComponent } from '../title/title.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { OrdersListComponent } from 'src/app/components/orders-list/orders-list.component';
import { MenuListComponent } from 'src/app/components/menu-list/menu-list.component';
import { SalesListComponent } from 'src/app/components/sales-list/sales-list.component';
import { MenuItemComponent } from 'src/app/components/menu-item/menu-item.component';
import { CartListComponent } from 'src/app/components/cart-list/cart-list.component';
import { CardInputComponent } from 'src/app/components/card-input/card-input.component';
import { CostDetailsComponent } from 'src/app/components/cost-details/cost-details.component';
import { OrderStatsComponent } from 'src/app/components/order-stats/order-stats.component';
import { CardTapComponent } from 'src/app/components/card-tap/card-tap.component';
import { QrShowComponent } from 'src/app/components/qr-show/qr-show.component';

@NgModule({
  declarations: [TitleComponent, FooterComponent, OrdersListComponent, MenuListComponent, SalesListComponent,
    MenuItemComponent, CartListComponent, CardInputComponent, CostDetailsComponent, OrderStatsComponent,
  CardTapComponent, QrShowComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [CommonModule, FormsModule, IonicModule, RouterModule, ReactiveFormsModule,
    TitleComponent, FooterComponent, OrdersListComponent, MenuListComponent, SalesListComponent,
    MenuItemComponent, CartListComponent, CardInputComponent, CostDetailsComponent, OrderStatsComponent,
    CardTapComponent, QrShowComponent]
})
export class SharedModule { }
