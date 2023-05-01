import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from '../services/storage.service';
import { APP_CONFIG, App } from '../services/model';
import { Router } from '@angular/router';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public apps = environment.apps;

  constructor(private ctx: StorageService, private utl: UtilService, private router: Router) { }

  /**
   * setApp
   */
  public async setApp(app: App, admin: boolean) {
    await this.ctx.set(APP_CONFIG, { name: app.name, menu: app.menu, admin } as App)
    this.router.navigate([await this.utl.routeFor(this.ctx)]);
  }

}
