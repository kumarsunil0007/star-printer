import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  async setObject(key, obj) {
    await Storage.set({
      key,
      value: JSON.stringify(obj)
    });
  }

  // JSON "get" example
  async getObject(key) {
    const ret = await Storage.get({ key });
    return JSON.parse(ret.value);
  }

  async setItem(key: any, value: any) {
    await Storage.set({
      key,
      value
    });
  }

  async getItem(key) {
    const { value } = await Storage.get({ key });
    return value;
  }

  async removeItem(key) {
    await Storage.remove({ key });
  }

  async keys() {
    const { keys } = await Storage.keys();
    console.log('Got keys: ', keys);
  }

  async clear() {
    await Storage.clear();
  }
}
