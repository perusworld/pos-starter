import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateTime } from 'luxon';
import { Cart, Payment, TapPurpose } from 'src/app/services/model';
import { UtilService } from 'src/app/services/util.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-qr-show',
  templateUrl: './qr-show.component.html',
  styleUrls: ['./qr-show.component.scss'],
})
export class QrShowComponent implements OnInit {

  @Input() purpose = TapPurpose.PAN;
  @Output() onPayment = new EventEmitter<Payment>();

  public data = {
    isOpen: false,
    qrCode: ''
  }

  constructor(private utl: UtilService) {
   }

  async ngOnInit() {
   }

   @Input()
   set setCart(cart: Cart | undefined) {
    if (cart?.id) {
      this.utl.genQRCode(`${environment.qrPrefix}${cart.id}`).then(code => this.data.qrCode = code);
    }
   }
 
  /**
   * showTap
   */
  public async showTap() {
    this.data.isOpen = true;
  }

  /**
   * cancelTap
   */
  public async cancelTap() {
    this.data.isOpen = false;
  }

  /**
   * callPayment
   */
  public async callPayment() {
    const dte = DateTime.now();
    await this.cancelTap();
    this.onPayment.emit({
      pan: environment.demo.cardNumber,
      holderName: environment.demo.cardHolderName,
      expMonth: `${dte.monthLong}`,
      expYear: `${dte.year}`,
      cvc: environment.demo.cardCVCCode,
    });

  }

  onWillDismiss(event: Event) {
    this.data.isOpen = false;
  }

}
