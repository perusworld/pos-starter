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
  public defaultApp = environment.defaultApp;

  constructor(private ctx: StorageService, private utl: UtilService, private router: Router) { }

  async ionViewDidEnter() {
    if (-1 !== this.defaultApp) {
      await this.utl.snooze()
      const app = this.apps[this.defaultApp];
      const admin = environment.defaultAppAdmin;
      await this.ctx.setApp({ ...app, ...{ admin } } as App)
      this.router.navigate([await this.utl.routeFor(this.ctx)]);
    }
  }

  /**
   * setApp
   */
  public async setApp(app: any, admin: boolean) {
    await this.ctx.setApp({ ...app, ...{ admin } } as App)
    this.router.navigate([await this.utl.routeFor(this.ctx)]);
  }
}
