import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  public appName = environment.posAppName;

  constructor(private router: Router) { }

  ngOnInit() {}

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
