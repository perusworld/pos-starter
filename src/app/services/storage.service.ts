import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { APP_CONFIG, App, AppConfig } from './model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private store: Storage | undefined;

  public appConfig = {} as AppConfig

  constructor(private storage: Storage) {
  }

  async init() {
    const storage = await this.storage.create();
    this.store = storage;
    this.appConfig.app = await this.get(APP_CONFIG);
  }

  public async setApp(app: App) {
    await this.store?.set(APP_CONFIG, app);
    this.appConfig.app = app;
  }

  public async set<T>(key: string, value: T) {
    await this.store?.set(key, value);
  }
  public async get<T>(key: string) : Promise<T> {
    return this.store?.get(key);
  }
  public async getCached<T>(key: string, loader: () => Promise<T>): Promise<T | undefined> {
    let ret:T;
    const cached = await this.store?.get(key);
    if (cached) {
      console.log('in cache returning');
      ret = cached;
    } else {
      console.log('Not in cache loading');
      ret = await loader();
      if (ret) {
        await this.set(key, ret);
      }
    }
    return ret;
  }


}
