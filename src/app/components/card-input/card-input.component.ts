import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DateTime } from 'luxon';
import { Cart, Payment } from 'src/app/services/model';
import { UtilService } from 'src/app/services/util.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card-input',
  templateUrl: './card-input.component.html',
  styleUrls: ['./card-input.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
})
export class CardInputComponent  implements OnInit {

  public currency = environment.currency;
  public paymentForm: FormGroup;

  public data = {
    yearValues: [] as number[],
    expDate: DateTime.now()
  }

  @Input() cart: Cart | undefined;
  @Output() onPayment = new EventEmitter<Payment>();

  constructor(private utl: UtilService, private formBuilder: FormBuilder) {
    this.data.yearValues = utl.fillRange(0, 10, DateTime.now().year);
    this.paymentForm = this.formBuilder.group({
      cardHolderName: ['', Validators.compose([Validators.required])],
      cardNumber: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]{16}$/)])],
      cardCVCCode: ['', Validators.compose([Validators.required, Validators.pattern(/^\d{3}$/)])],
    });
  }

  ngOnInit() { }

  /**
   * callPayment
   */
  public async callPayment() {
    if (this.paymentForm.valid) {
      this.onPayment.emit({
        pan: this.paymentForm.value.cardNumber,
        holderName: this.paymentForm.value.cardHolderName,
        expMonth: `${this.data.expDate.monthLong}`,
        expYear: `${this.data.expDate.year}`,
        cvc: this.paymentForm.value.cardCVCCode,
      });
    } else {
      this.utl.presentToast('Payment form not complete');
    }

  }

  public onDateChange(date: any) {
    this.data.expDate = DateTime.fromISO(date.detail.value);
  }

  /**
   * prefillCard
   */
  public prefillCard() {
    this.paymentForm.setValue({
      cardHolderName: environment.demo.cardHolderName,
      cardNumber: environment.demo.cardNumber,
      cardCVCCode: environment.demo.cardCVCCode,
    });
  }

}
