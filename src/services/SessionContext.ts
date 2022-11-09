import { Storage } from '@ionic/storage';

export class SessionContextImpl {
  private store = new Storage();

  /**
   * initContext
   */
  public async initContext() {
    await this.store.create();
  }

  public async set(key: string, value: any) {
    this.store.set(key, value);
  }
  public async get(key: string) {
    return this.store.get(key);
  }
  public async getCached(key: string, loader: any) {
    let ret = undefined;
    const cached = await this.store.get(key);
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
  // public getCurrentPosition(callback: any) {
  //   var ret = Session.data['CurrentPosition'];
  //   if (null == ret) {
  //     navigator.geolocation.getCurrentPosition(function (position) {
  //       Session.data['CurrentPosition'] = position;
  //       callback(position);
  //     }, function (error) {
  //       Session.data['CurrentPosition'] = null;
  //       callback(null);
  //     });
  //   } else {
  //     callback(ret);
  //   };
  // }
  // public fireEvent(msgId, args) {
  //   $rootScope.$broadcast(msgId, args);
  // }
  // public onEvent(msgId, handler) {
  //   $rootScope.$on(msgId, function (event, args) {
  //     handler(args);
  //   });
  // }


}

export const SessionContext = new SessionContextImpl();