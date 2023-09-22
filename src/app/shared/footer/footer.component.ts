import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { UtilService, YEAR_DATE_FORMAT } from 'src/app/services/util.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class FooterComponent  implements OnInit {

  public showFooter = environment.features.showFooter;
  public year = 0;

  constructor(public ctx: StorageService, private utl: UtilService) {}

  async ngOnInit() {
    this.year = this.utl.dateNum(YEAR_DATE_FORMAT);
  }

}
