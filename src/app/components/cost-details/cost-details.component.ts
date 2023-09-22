import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Cart } from 'src/app/services/model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cost-details',
  templateUrl: './cost-details.component.html',
  styleUrls: ['./cost-details.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class CostDetailsComponent  implements OnInit {

  @Input() showButtons: boolean = true;
  @Input() showTitle: boolean = true;
  @Input() cart: Cart | undefined;
  @Output() onConfirm = new EventEmitter();

  public currency = environment.currency;

  constructor() { }

  ngOnInit() { }

  /**
   * callConfirm
   */
  public async callConfirm() {
    this.onConfirm.emit();
  }
}
