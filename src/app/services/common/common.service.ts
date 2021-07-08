import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  HOST = 'http://localhost:8080';
  // HOST = 'https://isolution.asia';

  callRefreshTable = new EventEmitter();
  subsVar: Subscription;

  invokeRefreshTableFun() {
    this.callRefreshTable.emit();
  }

  titlePage: string;

  makeUrl(path: string): string {
    return this.HOST + '/api' + path + '?token_key=' + this.getCookie("token_key");
  }
  makeUrlForCustomer(path: string): string {
    return this.HOST + '/api' + path;
  }

  public deleteCookie(name) {
    this.setCookie(name, '', -1);
  }

  calculateAge(birthday: Date) {
    var diff_ms = Date.now() - new Date(birthday).getTime();
    var age_dt = new Date(diff_ms);
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

  public setCookie(name: string, value: string, expireDays: number, path: string = '/') {
    let d: Date = new Date();
    d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    let expires: string = `expires=${d.toUTCString()}`;
    let cpath: string = path ? `; path=${path}` : '';
    document.cookie = `${name}=${value}; ${expires}${cpath}`;
  }

  getCookie(name: string) {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = `${name}=`;
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) == 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return '';
  }

  setSession(name: string, value: string){
    sessionStorage.setItem(name, value);
  }

  getSession(name: string){
    return sessionStorage.getItem(name);
  }

  transformStatus(data: String) {
    switch (data) {
      case "CXD": return "Chưa xét duyệt";
      case "DXD": return "Đang chờ xét duyệt";
      case "DD": return "Đã duyệt";
      case "TC": return "Từ chối";
      case "YCT": return "Yêu cầu thêm";
      case "DX": return "Đề Xuất";
    }
  }
}
