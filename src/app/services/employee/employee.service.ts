import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subscription, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Attachment } from 'src/app/model/Attachment';
import { EmployeeAcc } from 'src/app/model/EmployeeAcc';
import { EmployeeInfoDTO } from 'src/app/model/EmployeeInfoDTO';
import { CommonService } from '../common/common.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  callRefreshTable = new EventEmitter();
  subsVar: Subscription;

  invokeRefreshTableFun() { 
    this.callRefreshTable.emit();
  }


  constructor(private httpClient: HttpClient, private common: CommonService) {  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: 'my-auth-token',
    }),
  }
  
  public resetPassEmployee(data:any): Observable<any>{
    const url = this.common.makeUrl("/employee/reset_acc_password_for_employee");
    return this.httpClient
    .post<any>(url,data,this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  public PauseEmployee(codeEmployeeNew:String,id_employee_old:number,listAttackment:Array<Attachment>): Observable<any>{
    let data = {codeEmployeeNew:codeEmployeeNew,id_employee_old:id_employee_old,listFileAttackment:listAttackment};
    const url = this.common.makeUrl("/employee/pause_employee_acc");
    return this.httpClient
    .post<any>(url,data,this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  public PauseEmployeeReason(data:any): Observable<any>{
    const url = this.common.makeUrl("/employee/pause_reason_employee");
    return this.httpClient
    .post<any>(url,data,this.httpOptions)
    .pipe(catchError(this.handleError));
  }


  public getAllAcc(): Observable<any>{
    const url = this.common.makeUrl("/employee/get_all_employee_acc");
    return this.httpClient
    .get<any>(url,this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  public getAllAccByIDRole(data:any): Observable<any>{
    const url = this.common.makeUrl("/employee/get_all_employee_acc_by_idRole");
    return this.httpClient
    .post<any>(url,data,this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  public getAllInfo(): Observable<any>{
    const url = this.common.makeUrl("/employee/get_all_employee_info");
    return this.httpClient
    .get<any>(url,this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  public getAllInfoAcc(): Observable<any>{
    const url = this.common.makeUrl("/employee/get_all_employee_info_acc");
    return this.httpClient
    .get<any>(url,this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  public searchAllInfoAcc(dateFrom:String,dateTo:String,searchValue:String): Observable<any>{
    let data = {dateFrom:dateFrom,dateTo:dateTo,searchValue:searchValue};
    const url = this.common.makeUrl("/employee/search_all_employee_info_acc");
    return this.httpClient
    .post<any>(url,data,this.httpOptions)
    .pipe(catchError(this.handleError));
  }
  
  public addOneAccEmployee(data:any): Observable<any>{
    const url = this.common.makeUrl("/employee/add_employee_acc");
    return this.httpClient
    .post<any>(url,data,this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  public getDetailEmployebyID(id:number): Observable<any>{
    const url = this.common.makeUrl("/employee/get_detail_employee_info/"+id);
    return this.httpClient
    .get<any>(url,this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  public getDetailEmployebyCode(code:string): Observable<any>{
    const url = this.common.makeUrl("/employee/get_detail_employee_info_by_code/");
    return this.httpClient
    .post<any>(url,code,this.httpOptions)
    .pipe(catchError(this.handleError));
  }
  public UpdateEmployeeInfo(employeeInfoDTO :EmployeeInfoDTO): Observable<any>{
    const url = this.common.makeUrl("/employee/update_employee_info");
    return this.httpClient
    .post<any>(url,employeeInfoDTO,this.httpOptions)
    .pipe(catchError(this.handleError));
  }
 
  public getAccByCode(data:any): Observable<any>{
    const url = this.common.makeUrl("/employee/get_one_employee_acc/"+data);
    return this.httpClient
    .get<any>(url,this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  public addEmployeeAccount(data : EmployeeAcc) : Observable<any>{
    const url = this.common.makeUrl("/employee/add_employee_acc");
    return this.httpClient
    .post<any>(url,data,this.httpOptions) 
    .pipe(catchError(this.handleError));
  } 

  public updateEmployeeAccount(data : EmployeeAcc) : Observable<any>{
    const url = this.common.makeUrl("/employee/update_employee_acc");
    return this.httpClient
    .post<any>(url,data,this.httpOptions) 
    .pipe(catchError(this.handleError));
  } 

  public addEmployeeInfo(employeeInfoDTO:EmployeeInfoDTO) : Observable<any>{
    const url = this.common.makeUrl("/employee/add_employee_info");
    return this.httpClient
    .post<any>(url,employeeInfoDTO,this.httpOptions) 
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
