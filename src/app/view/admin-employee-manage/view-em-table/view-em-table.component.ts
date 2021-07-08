import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmployeeAcc } from 'src/app/model/EmployeeAcc';
import { EmployeeInfoDTO } from 'src/app/model/EmployeeInfoDTO';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { ServerHttpService } from 'src/app/services/http/server-http.service';
import { AdminAddAccountEmployeeComponent } from '../../dialog/admin-add-account-employee/admin-add-account-employee.component';
import { AdminResetPasswordComponent } from '../../dialog/admin-reset-password/admin-reset-password/admin-reset-password.component';

@Component({
  selector: 'app-view-em-table',
  templateUrl: './view-em-table.component.html',
  styleUrls: ['./view-em-table.component.css']
})
export class ViewEmTableComponent implements OnInit {
  public employeeInfos = [];


  statusAddAcc: boolean = false;
  constructor(private spinner: NgxSpinnerService, private serverHttpService: ServerHttpService, private employeeService: EmployeeService, public dialog: MatDialog, private router: Router) { }

  page: number = 1;
  totalRecords: number;
  data: Array<EmployeeInfoDTO>;

  ngOnInit(): void {  
      this.employeeService.subsVar = this.employeeService.    
      callRefreshTable.subscribe((name:string) => {    
        this.refresh();
      });   
    this.refresh();
  }
  

  public resetAccPassword(employeeinfo:EmployeeInfoDTO){
    const dialogRef = this.dialog.open(AdminResetPasswordComponent,({
      data:employeeinfo
    }));

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  public openDialog(employeeinfo: EmployeeInfoDTO) {
    this.dialog.open(AdminAddAccountEmployeeComponent, {
      data: employeeinfo
    });
  }
  public EmployeeDetail(id: number) {
    this.router.navigate(['employee-detail-admin', id]);
  }

  public refresh() {
    this.spinner.show();
    this.employeeService.getAllInfoAcc().subscribe((data => {
      this.data = data;
      this.totalRecords = data.length;
      this.spinner.hide();
    }))
  }

  searchValue: String = "";
  dateFrom: Date;
  dateTo: Date;
  Search() {
    this.spinner.show();
    try {
      let dateTo1: String;
      let dateFrom1: String;
      let dateToValue = (<HTMLInputElement>document.getElementById('RtoSearch')).value;
      let dateFromValue = (<HTMLInputElement>document.getElementById('RfromSearch')).value;
      if (dateFromValue == "") {      
        this.dateFrom = new Date('1990-01-01');
        dateFrom1 = this.dateFrom.getFullYear() + "-" + (this.dateFrom.getMonth() + 1) + "-" + this.dateFrom.getDate()
      } else {        
        dateFrom1 = this.dateFrom.toString();
      }

      if (dateToValue == "") {
        this.dateTo = new Date();
        dateTo1 = this.dateTo.getFullYear() + "-" + (this.dateTo.getMonth() + 1) + "-" + this.dateTo.getDate()
      }
      else {
        dateTo1 = this.dateTo.toString();
      }
      let searchText = "%" + this.searchValue + "%";
      this.employeeService.searchAllInfoAcc(dateFrom1,dateTo1,searchText).subscribe((data => {
        this.data = data;
        this.totalRecords = data.length;
        this.spinner.hide();
        this.page=1;
      }))

    } catch (error) {
      console.log(error);
    }
  }

  ResetDate(){
  this.dateFrom = null;
  this.dateTo = null;
  }


  key = '';
  reverse: boolean = true;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  displayAddAccDialog(): void {
    this.statusAddAcc = !this.statusAddAcc;
  }
  public onSubmit(accForm: NgForm) {
    // console.log("Username :"+this.user + "Password : "+this.password);
    const newEmAcc = new EmployeeAcc(accForm.value.user, accForm.value.password, 1, true);
    this.employeeService.addEmployeeAccount(newEmAcc).subscribe((data => {
    }));
    this.displayAddAccDialog();
  }
}
