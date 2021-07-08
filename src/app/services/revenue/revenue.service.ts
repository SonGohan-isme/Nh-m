import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Revenue } from 'src/app/model/Revenue';
import { CommonService } from '../common/common.service';

@Injectable({
  providedIn: 'root'
})
export class RevenueService {

  constructor(private httpClient: HttpClient, private common: CommonService,private route: Router) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: 'my-auth-token',
    }),
  }

  public addOneRevenue(data:Revenue):Observable<any>{
    const url = this.common.makeUrl("/revenue/save_one_revenue");
    return this.httpClient
    .post<any>(url,data,this.httpOptions)
    .pipe(catchError(this.handleError))
  }
  public getAllRevenue(code_em_support:String):Observable<any>{
    const url = this.common.makeUrl("/revenue/get_all_revenue_employee");
    return this.httpClient
    .post<any>(url,code_em_support,this.httpOptions)
    .pipe(catchError(this.handleError))
  }

  public getAllRevenueMonthBefore(code_em_support:String,monthDate:number,yearDate:number):Observable<any>{
    const url = this.common.makeUrl("/revenue/get_all_revenue_employee_month_before");
    let data = {code_em_support:code_em_support,monthDate:monthDate,yearDate:yearDate}
    return this.httpClient
    .post<any>(url,data,this.httpOptions)
    .pipe(catchError(this.handleError))
  }

  public getAllRevenueYearBefore(code_em_support:String,yearDate:number):Observable<any>{
    const url = this.common.makeUrl("/revenue/get_all_revenue_employee_year_before");
    let data = {code_em_support:code_em_support,yearDate:yearDate}
    return this.httpClient
    .post<any>(url,data,this.httpOptions)
    .pipe(catchError(this.handleError))
  }

  public getAllIncomeSaler(data:any):Observable<any>{
    const url = this.common.makeUrl("/revenue/get_all_income_saler");
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
