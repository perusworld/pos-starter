import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private store: Storage | undefined;

  constructor(private storage: Storage) {
  }

  async init() {
    const storage = await this.storage.create();
    this.store = storage;
  }

  public async set<T>(key: string, value: T) {
    this.store?.set(key, value);
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
