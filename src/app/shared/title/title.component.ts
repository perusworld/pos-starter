import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APP_CONFIG, App } from 'src/app/services/model';
import { StorageService } from 'src/app/services/storage.service';
import { UtilService } from 'src/app/services/util.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
})
export class TitleComponent implements OnInit {
  @Input() titleText: string = '';
  @Input() showButtons: boolean = false;
  @Input() showBackButton: boolean = false;

  public showHeader = environment.features.showHeader;
  public appName = 'App Name';

  constructor(private router: Router, private ctx: StorageService, private utl: UtilService) {}

  async ngOnInit() {
    const app: App = await this.ctx.get(APP_CONFIG);
    this.appName = app.name;
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
    this.router.navigate(['/home']);
  }



}
