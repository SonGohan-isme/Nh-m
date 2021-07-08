import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminDataServiceService {

  private _status : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  status$ : Observable<boolean> = this._status.asObservable();

  constructor() { }

  setStatus(status: boolean){
    this._status.next(status);
  }
}
