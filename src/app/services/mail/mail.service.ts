import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Mail } from 'src/app/model/Mail';
import { CommonService } from '../common/common.service';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  public mail : Mail;
  constructor(private httpClient: HttpClient, private common: CommonService,private route: Router) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: 'my-auth-token',
    }),
  }

  public getAllMail(data:any) : Observable<any> {
    const url = this.common.makeUrl("/mail/all_mail/");
    return this.httpClient.post<any>(url,data,this.httpOptions)
    .pipe(catchError(this.handleError));
  }
  public getAllMailSent(data:any) : Observable<any> {
    const url = this.common.makeUrl("/mail/all_mail_sent/");
    return this.httpClient.post<any>(url,data,this.httpOptions)
    .pipe(catchError(this.handleError));
  }
  public searchAllMailReceive(userCode:String,dateFrom:String,dateTo:String,searchValue:String) : Observable<any> {
    let data = {userCode:userCode,dateFrom:dateFrom,dateTo:dateTo,searchValue:searchValue};
    const url = this.common.makeUrl("/mail/search_mail_receive/");
    return this.httpClient.post<any>(url,data,this.httpOptions)
    .pipe(catchError(this.handleError));
  }
  public searchAllMailSent(userCode:String,dateFrom:String,dateTo:String,searchValue:String) : Observable<any> {
    let data = {userCode:userCode,dateFrom:dateFrom,dateTo:dateTo,searchValue:searchValue};
    const url = this.common.makeUrl("/mail/search_mail_sent/");
    return this.httpClient.post<any>(url,data,this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  
  public getDetailMail(mailId: number) : Observable<any> {
    const url = this.common.makeUrl("/mail/get_detail_mail/"+mailId);
    return this.httpClient.get<any>(url, this.httpOptions).pipe(catchError(this.handleError));
  }

  public addNewMail(data:any) : Observable<any> {
    const url = this.common.makeUrl("/mail/add_mail/");
    return this.httpClient.post<any>(url, data, this.httpOptions).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  mailId: number;
  setMailId(mailId: number){
    this.mailId = mailId;
  }
  getMailId(): number {
    return this.mailId;
  }
}
