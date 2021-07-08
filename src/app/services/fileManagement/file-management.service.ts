import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommonService } from '../common/common.service';

@Injectable({
  providedIn: 'root'
})
export class FileManagementService {

  constructor(private httpClient: HttpClient, private common: CommonService) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: 'my-auth-token',
    }),
  }

  //contract attachment
  public uploadFileCustomer(data: any): Observable<any> {
    const url = this.common.makeUrl('/file_management/upload_file_customer/');
    return this.httpClient
      .post<any>(url, data, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  public saveFile(data: any): Observable<any> {
    const url = this.common.makeUrl('/attachment/save_customer_attachment/');
    return this.httpClient
      .post<any>(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getFile(data: any): Observable<any> {
    const url = this.common.makeUrl('/attachment/get_customer_attachment/');
    return this.httpClient
      .post<any>(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  //
  public getFileForCustomer(data: any): Observable<any> {
    const url = this.common.makeUrlForCustomer('/customer-api/get_customer_attachment/');
    return this.httpClient
      .post<any>(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public saveFileAttachment(data: any): Observable<any> {
    const url = this.common.makeUrl('/attachment/save_attachment/');
    return this.httpClient
      .post<any>(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public uploadFileRequest(data: any): Observable<any> {
    const url = this.common.makeUrl('/file_management/upload_file_request/');
    return this.httpClient
      .post<any>(url, data, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  //claim attachment
  public saveFileRequest(data: any): Observable<any> {
    const url = this.common.makeUrl('/attachment/save_request_attachment/');
    return this.httpClient
      .post<any>(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getFileRequest(data: any): Observable<any> {
    const url = this.common.makeUrl('/attachment/get_request_attachment/');
    return this.httpClient
      .post<any>(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getFileForRequest(data: any): Observable<any> {
    const url = this.common.makeUrlForCustomer('/customer-api/get_request_attachment/');
    return this.httpClient
      .post<any>(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
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
}
