import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cart } from 'src/app/services/model';
import { UtilService } from 'src/app/services/util.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-stats',
  templateUrl: './order-stats.component.html',
  styleUrls: ['./order-stats.component.scss'],
})
export class OrderStatsComponent implements OnInit {

  @Input() cart: Cart | undefined;
  @Output() onEmailReceipt = new EventEmitter<string>();
  @Output() onContinue = new EventEmitter();
  public currency = environment.currency;

  public emailForm: FormGroup;

  constructor(private utl: UtilService, private formBuilder: FormBuilder) {
    this.emailForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });

  }

  ngOnInit() { }

  /**
   * callEmailReceipt
   */
  public async callEmailReceipt() {
    if (this.emailForm.valid) {
      this.onEmailReceipt.emit(this.emailForm.value.email);
    } else {
      this.utl.presentToast('Invalid email');
    }
  }

  /**
   * callContinue
   */
  public async callContinue() {
    this.onContinue.emit();
  }
}
