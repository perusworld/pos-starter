import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ModalController, Platform, ToastController } from '@ionic/angular';
import { DateTime, Settings } from 'luxon';
import { environment } from 'src/environments/environment';
import { APP_CONFIG, App, OrderStatus } from './model';
import { StorageService } from './storage.service';
import { NEW_ORDER } from '../pages/order-details/order-details.page';
import * as QRCode from 'qrcode'

export enum ProgressStepState {
  NOT_STARTED = "notStarted", SUCCESS = "success", IN_PROGRESS = "inProgress", FAILED = "failed"
}

export interface ProgressCallback {
  updateProgress(step: number, state: ProgressStepState, message: string): void;
  done(state: ProgressStepState, message: string): void;
}

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  private loader: any;
  private modal: any;

  constructor(public loadingCtrl: LoadingController, public alertCtrl: AlertController,
    public modalCtrl: ModalController, public toastController: ToastController,
    private plt: Platform) {
    Settings.defaultZone = environment.timeZone;

  }

  public rnd(start: number, end: number): number {
    return start + Math.floor(Math.random() * (end - start));
  }

  public rndOf<T>(arr: T[]) {
    return arr[Math.floor((Math.random() * arr.length) + 1) - 1];
  }

  public objToArray(obj: any): any[] {
    let ret = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        ret.push({ name: key, value: obj[key] });
      }
    }
    return ret;
  }

  presentLoading(msg: string): Promise<any> {
    return this.hideLoading().then(done => this.loadingCtrl.create({
      message: msg
    })).then(loader => this.loader = loader)
      .then(loader => loader.present());
  }

  hideLoading(): Promise<any> {
    if (this.loader) {
      return this.loader.dismiss().then((resp: any) => { this.loader = null; return true });
    } else {
      return this.resultPromise(true);
    }
  }

  async doInLoading(msg: string, callback: any): Promise<any | undefined> {
    let ret = undefined;
    await this.presentLoading(msg);
    try {
      ret = await callback();
      await this.hideLoading();
    } catch (err) {
      await this.hideLoading();
      this.showErrorAlert(err);
    }
    return ret;
  }


  showAlert(title: string, subtitle: string, buttons: any[] = ['OK']): Promise<any> {
    return this.alertCtrl.create({
      header: title,
      subHeader: subtitle,
      buttons: buttons
    }).then(alrt => alrt.present());
  }

  resolveErrorMessage(err: any) {
    let ret = "Error Processing Your Request";
    if (null != err) {
      if (undefined !== err['data'] && undefined !== err['data']['message']) {
        ret = err['data']['message'];
      } else if (undefined === err['message']) {
        ret = JSON.stringify(err, null, 2);
      } else {
        ret = err['message'];
      }
    }
    return ret;
  }

  showErrorAlert(err: any): Promise<any> {
    return this.showAlert('Error!', this.resolveErrorMessage(err));
  }

  public resultPromise<T>(res: T, success: boolean = true): Promise<T> {
    return new Promise((resolve, reject) => {
      success ? resolve(res) : reject(res);
    });
  }

  async presentModal(page: any, opts: any = {}, backdropDismiss = false, canDismiss = false): Promise<any> {
    await this.hideModal();
    this.modal = await this.modalCtrl.create({
      component: page,
      componentProps: { ...opts, ...{ modalController: this.modalCtrl } },
      backdropDismiss: backdropDismiss,
      canDismiss: canDismiss
    });
    await this.modal.present();
    return this.modal;
  }

  hideModal(ref = null): Promise<any> {
    let useModal = null === ref;
    let toCheck = useModal ? this.modal : ref;
    if (toCheck) {
      return toCheck.dismiss().then((resp: any) => { useModal ? this.modal = null : false; return true });
    } else {
      return this.resultPromise(true);
    }
  }

  async presentToast(msg: string, duration: number = 2000, position: 'top' | 'bottom' | 'middle' = 'bottom'): Promise<void> {
    const toast = await this.toastController.create({
      message: msg,
      duration: duration,
      position: position
    });
    return toast.present();
  }

  async snooze(ms = 1000): Promise<any> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  fillRange(start: number, end: number, beginWith = 0) {
    return Array(end - start).fill(0, start, end).map((item, index) => beginWith + index);
  };

  async doWait(callBack: () => Promise<boolean>, sleepTime = 1000, maxRetry = 10): Promise<boolean> {
    let ret = await callBack();
    let done = false;
    do {
      if (undefined === ret) {
        console.log('ok waiting', maxRetry);
        await this.snooze(sleepTime);
        ret = await callBack();
      } else {
        done = true;
      }
    } while (!done && 0 < --maxRetry)
    return ret;
  }

  /**
   * iconForOrderStatus
   */
  public iconForOrderStatus(status: OrderStatus): string {
    let ret = '';
    switch (status) {
      case OrderStatus.Cancelled:
        ret = 'close-circle-outline';
        break;
      case OrderStatus.Fulfilled:
        ret = 'bag-check-outline';
        break;
      default:
        ret = 'ellipsis-horizontal-outline';
        break;
    }
    return ret;
  }


  /**
   * colorForOrderStatus
   */
  public colorForOrderStatus(status: OrderStatus): string {
    let ret = '';
    switch (status) {
      case OrderStatus.Cancelled:
        ret = 'danger';
        break;
      case OrderStatus.Fulfilled:
        ret = 'success';
        break;
      default:
        ret = 'warning';
        break;
    }
    return ret;
  }

  // public async loadStaticConfig(): Promise<StaticConfig> {
  //   return fetch('./assets/data/static-config.json')
  //     .then(resp => resp.json())
  //     .then(resp => resp as StaticConfig);
  // }

  /**
   * routeFor
   */
  public async routeFor(ctx: StorageService) {
    const app: App = await ctx.get(APP_CONFIG);
    return app.admin ? '/tabs' : `/order-details/${NEW_ORDER}`;
  }

  /**
   * genQRCode
   */
  public async genQRCode(data: string, version = 5) {
    return QRCode.toDataURL(data, { version });
  }
}
