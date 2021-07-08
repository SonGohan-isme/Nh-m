import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Contract } from 'src/app/model/Contract';
import { CommonService } from '../common/common.service';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(private httpClient: HttpClient, private common: CommonService, private route: Router) { }

  callRefreshTable = new EventEmitter();
  subsVar: Subscription;

  invokeRefreshTableFun() { 
    this.callRefreshTable.emit();
  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: 'my-auth-token',
    }),
  }

  public getAllContract(code_em_support:string): Observable<any> {
    const url = this.common.makeUrl("/contract/get_all_contract_of_employee");
    return this.httpClient
      .post<any>(url,code_em_support,this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getAllContractForCustomer(data:any): Observable<any> {
    const url = this.common.makeUrlForCustomer("/customer-api/contract-list");
    return this.httpClient
      .post<any>(url,data,this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public searchAllContractForCustomer(id_customer:String,dateFrom:String,dateTo:String,searchValue:String): Observable<any> {
    let data = {id_customer:id_customer,dateFrom:dateFrom,dateTo:dateTo,searchValue:searchValue};
    const url = this.common.makeUrlForCustomer("/customer-api/search-contract-list");
    return this.httpClient
      .post<any>(url,data,this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getOneContractDetailForCustomer(data:any): Observable<any> {
    const url = this.common.makeUrlForCustomer("/customer-api/get_detail_contract_for_customer");
    return this.httpClient
      .post<any>(url,data,this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public searchAllContract(code_em_support:string,dateFrom:String,dateTo:String,searchValue:String ): Observable<any> {
    let data = {code_em_support:code_em_support,dateFrom:dateFrom,dateTo:dateTo,searchValue:searchValue};
    const url = this.common.makeUrl("/contract/search_all_contract_of_employee");
    return this.httpClient
      .post<any>(url,data,this.httpOptions)
      .pipe(catchError(this.handleError));
  }

 
  public getDetailContract(data:any): Observable<any> {
    const url = this.common.makeUrl("/contract/get_detail_contract/");
    return this.httpClient
      .post<any>(url,data,this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getDetailContractForCustomer(data:any): Observable<any> {
    const url = this.common.makeUrl("/contract/get_detail_contract_for_customer/");
    return this.httpClient
      .post<any>(url,data,this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public setStatusContract(id_contract: number,id_request:number,description:String,approval_status:string): Observable<any> {
    const url = this.common.makeUrl("/contract/set_active_contract");
    let data = {id_contract:id_contract,id_request:id_request,description:description,approval_status};
    return this.httpClient
      .post<any>(url,data,this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public addContract(contract: Contract): Observable<any> {
    const url = this.common.makeUrl("/contract/add_contract");
    return this.httpClient
      .post<any>(url, contract, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public EditContract(contract: Contract): Observable<any> {
    const url = this.common.makeUrl("/contract/edit_contract");
    return this.httpClient
      .post<any>(url, contract, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getAllContractChangeHistory(id: number): Observable<any> {
    const url = this.common.makeUrl("/contract/get_all_contract_change_history/" + id);
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getAllIntersetPaymentHistory(id: number): Observable<any> {
    const url = this.common.makeUrl("/contract/get_all_interset_payment_history/" + id);
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getAllFeePaymentHistory(id: number): Observable<any> {
    const url = this.common.makeUrl("/contract/get_all_fee_payment_history/" + id);
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getDetailContractChangeHistory(id: number): Observable<any> {
    const url = this.common.makeUrl("/contract/get_detail_contract_change_history/" + id);
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getAllCountContract(code_em_support:String,monthDate:number):Observable<any>{
    const url = this.common.makeUrl("/contract/get_all_count_contract");
    let data = {code_em_support:code_em_support,monthDate:monthDate}
    return this.httpClient
    .post<any>(url,data,this.httpOptions)
    .pipe(catchError(this.handleError))
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
