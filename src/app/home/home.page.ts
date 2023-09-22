import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from '../services/storage.service';
import { UtilService } from '../services/util.service';
import { Router } from '@angular/router';
import { App } from '../services/model';
import { SharedModule } from '../shared/shared/shared.module';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class HomePage {
  public apps = environment.apps;

  constructor(private ctx: StorageService, private utl: UtilService, private router: Router) { }

  /**
   * setApp
   */
  public async setApp(app: any, admin: boolean) {
    await this.ctx.setApp({ ...app, ...{ admin } } as App)
    this.router.navigate([await this.utl.routeFor(this.ctx)]);
  }
}
