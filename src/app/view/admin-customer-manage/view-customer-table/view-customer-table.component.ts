import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CustomerAcc } from 'src/app/model/CustomerAcc';
import { CustomerInfo } from 'src/app/model/CustomerInfo';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { CommonService } from 'src/app/services/common/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminResetPasswordComponent } from '../../dialog/admin-reset-password/admin-reset-password/admin-reset-password.component';


@Component({
  selector: 'app-view-customer-table',
  templateUrl: './view-customer-table.component.html',
  styleUrls: ['./view-customer-table.component.css']
})
export class ViewCustomerTableComponent implements OnInit {

  constructor(private spinner : NgxSpinnerService,private customerService :CustomerService,private common: CommonService,public dialog: MatDialog,private router:Router) { }
  ngOnInit(): void {
    this.customerService.subsVar = this.customerService.    
      callRefreshTable.subscribe((name:string) => {    
        this.refresh();
      });   
    this.refresh();
  }

  page:number = 1;
  data: Array<CustomerInfo>;
  totalRecords:number;

  status: boolean = false;
  
  public customerDetail(id:number){
    this.router.navigate(['customer-detail-admin',id]);
  }

  resetAccPassword(customerinfo : CustomerInfo){
    const dialogRef = this.dialog.open(AdminResetPasswordComponent,({
      data:customerinfo
    }));

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onSelectAcc(id:number){
    this.router.navigate(['customer-detail',id]);
  }

  refresh(){
    this.spinner.show();
    this.customerService.getAllCustomerInfoAdmin().subscribe((data => {
      this.data = data;
      this.totalRecords = data.length;
    })) 
    this.spinner.hide();
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
      this.customerService.searchAllCustomerInfoAdmin(dateFrom1,dateTo1,searchText).subscribe((data => {
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

}
