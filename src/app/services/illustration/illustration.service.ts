import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CustomerOwnIllustration } from 'src/app/model/CustomerOwnIllustration';
import { Illustration } from 'src/app/model/Illustration';
import { CommonService } from '../common/common.service';

@Injectable({
  providedIn: 'root'
})
export class IllustrationService {

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

  constructor(private httpClient: HttpClient,private common: CommonService) { }

  public getAllCustomerOwnIllustration(code_em_support:string): Observable<any>{
    const url = this.common.makeUrl('/campaign/get_all_campaign/');
    return this.httpClient
    .post<any>(url,code_em_support,this.httpOptions)
    .pipe(catchError(this.handleError));
  }
  public searchAllCustomerOwnIllustration(code_em_support:String,create_time:String,end_time:String,searchValue:String): Observable<any>{
    let data = {code_em_support:code_em_support,create_time:create_time,end_time:end_time,searchValue:searchValue};
    const url = this.common.makeUrl('/campaign/search_all_campaign/');
    return this.httpClient
    .post<any>(url,data,this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  public getAllIllustrationBelongCustomer(id:number): Observable<any>{
    const url = this.common.makeUrl('/illustration/get_all_illustration_belong_customer/'+id);
    return this.httpClient
    .get<any>(url,this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  public searchAllIllustrationBelongCustomer(id:number,dateFrom:String,dateTo:String,searchValue:String,): Observable<any>{
    let data = {id:id,dateFrom:dateFrom,dateTo:dateTo,searchValue:searchValue};
    const url = this.common.makeUrl('/illustration/search_all_illustration_belong_customer');
    return this.httpClient
    .post<any>(url,data,this.httpOptions)
    .pipe(catchError(this.handleError));
  }


  public getIllustrationContractCreate(id:number): Observable<any>{
    const url = this.common.makeUrl('/illustration/get_detail_illustration/');
    return this.httpClient
    .post<any>(url,id,this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  public getIllustContractCreateForCustomerWebsite(id:number): Observable<any>{
    const url = this.common.makeUrlForCustomer('/customer-api/get_detail_illustration/');
    return this.httpClient
    .post<any>(url,id,this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  public getAllIllustration(): Observable<any>{
    const url = this.common.makeUrl('/illustration/get_all_illustration');
    return this.httpClient
    .get<any>(url,this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  public addOneCustomerOwnIllustration(code:string,end_time:Date): Observable<any>{
    const url = this.common.makeUrl('/campaign/add_one_campaign/');
    let data = {code:code,end_time:end_time};
    return this.httpClient
    .post<any>(url,data,this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  public saveOneIllustration(illustration:Illustration): Observable<any>{
    const url = this.common.makeUrl('/illustration/add_one_illustration/');
    return this.httpClient
    .post<any>(url,illustration,this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  public getAllSubBenefitById(id:number): Observable<any>{
    const url = this.common.makeUrl('/illustration/get_all_sub_benefit/'+id);
    return this.httpClient
    .get<any>(url,this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  public getMainBenefitById(id:number): Observable<any>{
    const url = this.common.makeUrl('/illustration/get_main_benefit/'+id);
    return this.httpClient
    .get<any>(url,this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  public getAllMainBenefitScaleByMainBenefitId(id:number): Observable<any>{
    const url = this.common.makeUrl('/illustration/get_all_main_benefit_scale/'+id);
    return this.httpClient
    .get<any>(url,this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  public getAllSubBenefitScaleBySubBenefitId(id:number): Observable<any>{
    const url = this.common.makeUrl('/illustration/get_all_sub_benefit_scale/'+id);
    return this.httpClient
    .get<any>(url,this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  // lấy tất cả bảng minh họa cho customer tại web customerWebsite
  public getAllIllustrationForCustomer(data:any): Observable<any>{
    const url = this.common.makeUrlForCustomer('/customer-api/get_all_illustration_customer/');
    return this.httpClient
    .post<any>(url,data,this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  public searchAllIllustrationForCustomer(id_customer:String,dateFrom:String,dateTo:String,searchValue:String): Observable<any>{
    let data = {id_customer:id_customer,dateFrom:dateFrom,dateTo:dateTo,searchValue:searchValue};
    const url = this.common.makeUrlForCustomer('/customer-api/search_all_illustration_customer/');
    return this.httpClient
    .post<any>(url,data,this.httpOptions)
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
