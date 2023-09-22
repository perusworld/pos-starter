import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { OrderService } from 'src/app/services/order.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtilService } from 'src/app/services/util.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class TitleComponent implements OnInit {
  @Input() titleText: string = '';
  @Input() showButtons: boolean = false;
  @Input() showBackButton: boolean = false;

  public showHeader = environment.features.showHeader;

  constructor(private router: Router, public ctx: StorageService, private utl: UtilService, private orderService: OrderService) { }

  async ngOnInit() {
  }

  /**
   * gotoApp
   */
  public async gotoApp() {
    this.router.navigate([await this.utl.routeFor(this.ctx)]);
  }

  /**
   * gotoSettings
   */
  public async gotoSettings() {
    this.router.navigate(['/settings']);
  }

  /**
   * doLogout
   */
  public async doLogout() {
    // await this.auth.doLogout();
    await this.orderService.newOrder();
    this.router.navigate(['/home']);
  }



}
