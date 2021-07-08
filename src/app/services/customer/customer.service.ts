import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Contact } from 'src/app/model/Contact';
import { CustomerAcc } from 'src/app/model/CustomerAcc';
import { CustomerInfo } from 'src/app/model/CustomerInfo';
import { Request } from 'src/app/model/Request';
import { CommonService } from '../common/common.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  public customer: CustomerInfo;
  callRefreshTable = new EventEmitter();
  subsVar: Subscription;

  invokeRefreshTableFun() {
    this.callRefreshTable.emit();
  }

  constructor(private httpClient: HttpClient, private common: CommonService, private route: Router) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: 'my-auth-token',
    }),
  }

  public updateCustomerInfo(customerInfo: CustomerInfo): Observable<any> {
    const url = this.common.makeUrl("/customer/update_one_customer_info");
    return this.httpClient
      .post<any>(url, customerInfo, this.httpOptions)
      .pipe(catchError(this.handleError))
  }

  // lấy các khách hàng bao gồm thông tin illustration và contract
  public getAllCustomerInfo(code_em_support: string): Observable<any> {
    const url = this.common.makeUrl("/customer/get_all_customer_info");
    return this.httpClient
      .post<any>(url, code_em_support, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // lấy các khách hàng KHÔNG bao gồm thông tin illustration và contract
  public getAllCustomer(code_em_support: string): Observable<any> {
    const url = this.common.makeUrl("/customer/get_all_customer");
    return this.httpClient
      .post<any>(url, code_em_support, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // reset password cua khach hang
  public resetPassCustomer(data: any): Observable<any> {
    const url = this.common.makeUrl("/customer/reset_acc_password_for_customer");
    return this.httpClient
      .post<any>(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public searchAllCustomer(code_em_support: string, dateFrom: String, dateTo: String, searchValue: String): Observable<any> {
    const url = this.common.makeUrl("/customer/search_all_customer_info");
    let data = { code_em_support: code_em_support, dateFrom: dateFrom, dateTo: dateTo, searchValue: searchValue };
    return this.httpClient
      .post<any>(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getAllCustomerInfoAdmin(): Observable<any> {
    const url = this.common.makeUrl("/customer/get_all_customer_info_admin");
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public searchAllCustomerInfoAdmin(dateFrom: String, dateTo: String, searchValue: String): Observable<any> {
    let data = { dateFrom: dateFrom, dateTo: dateTo, searchValue: searchValue };
    const url = this.common.makeUrl("/customer/search_all_customer_info_admin");
    return this.httpClient
      .post<any>(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }


  public getDetailCustomerInfoAdmin(id: number): Observable<any> {
    const url = this.common.makeUrl("/customer/get_detail_customer_info_admin/" + id);
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public updateOneAccCustomer(customerAcc: CustomerAcc): Observable<any> {
    const url = this.common.makeUrl("/customer/update_customer_acc");
    return this.httpClient
      .post<any>(url, customerAcc, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public addCustomerInfo(customerInfo: CustomerInfo): Observable<any> {
    const url = this.common.makeUrl("/customer/add_customer_info");
    return this.httpClient
      .post<any>(url, customerInfo, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getOneCustomerInfoBySaler(id: number, token_key: String) {
    const url = this.common.makeUrl("/customer/get_one_customer_info");
    let data = { id: id, token_key: token_key };
    return this.httpClient
      .post<any>(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public sendOneAccCustomer(id: number) {
    const url = this.common.makeUrl("/customer/send_acc_for_customer");
    return this.httpClient
      .post<any>(url, id, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public addOneCustomerRequest(req: Request) {
    const url = this.common.makeUrlForCustomer("/customer-api/add_one_customer_request");
    return this.httpClient
      .post<any>(url, req, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public uploadCustomerFileRequest(data: any): Observable<any> {
    const url = this.common.makeUrlForCustomer('/customer-api/upload_customer_file_request/');
    return this.httpClient
      .post<any>(url, data, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  public saveCustomerFileRequest(data: any): Observable<any> {
    const url = this.common.makeUrlForCustomer('/customer-api/save_customer_request_attachment/');
    return this.httpClient
      .post<any>(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public authenAccCustomer(data: any) {
    const url = this.common.makeUrlForCustomer("/customer-api/login/");
    return this.httpClient
      .post<any>(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getOneInfoCustomer(data: any) {
    const url = this.common.makeUrlForCustomer("/customer-api/get_one_customer_info/");
    return this.httpClient
      .post<any>(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public changePassCustomer(data: any) {
    const url = this.common.makeUrlForCustomer("/customer-api/change_pass/");
    return this.httpClient
      .post<any>(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  //Contact
  public getAllProvince(): Observable<any> {
    const url = this.common.makeUrlForCustomer("/customer-api/get_all_province");
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getAllDistrictByIdProvince(id_province: number): Observable<any> {
    const url = this.common.makeUrlForCustomer("/customer-api/get_all_district_by_id_province");
    return this.httpClient
      .post<any>(url, id_province, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public addOneContact(contact: Contact) {
    const url = this.common.makeUrlForCustomer("/customer-api/add_one_contact");
    return this.httpClient
      .post<any>(url, contact, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  //claim submit form
  public getDetailContractForCustomer(data: any): Observable<any> {
    const url = this.common.makeUrlForCustomer("/customer-api/get_detail_contract_for_customer/");
    return this.httpClient
      .post<any>(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getAllSubBenefitById(id: number): Observable<any> {
    const url = this.common.makeUrlForCustomer('/customer-api/get_all_sub_benefit/' + id);
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getAllMainBenefitScaleByMainBenefitId(id: number): Observable<any> {
    const url = this.common.makeUrlForCustomer('/customer-api/get_all_main_benefit_scale/' + id);
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getAllSubBenefitScaleBySubBenefitId(id: number): Observable<any> {
    const url = this.common.makeUrlForCustomer('/customer-api/get_all_sub_benefit_scale/' + id);
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getAllCustomerRequest(code_sender: string): Observable<any> {
    const url = this.common.makeUrlForCustomer("/customer-api/get_all_customer_request");
    return this.httpClient
      .post<any>(url, code_sender, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public searchAllCustomerRequest(code_sender: string, dateFrom: String, dateTo: String, searchValue: String): Observable<any> {
    let data = { code_sender: code_sender, dateFrom: dateFrom, dateTo: dateTo, searchValue: searchValue };
    const url = this.common.makeUrlForCustomer("/customer-api/search_all_customer_request");
    return this.httpClient
      .post<any>(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  //notification
  public getAllNotificationByIdCustomer(data: any): Observable<any> {
    const url = this.common.makeUrlForCustomer("/customer-api/get_all_notification_by_id_customer");
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
