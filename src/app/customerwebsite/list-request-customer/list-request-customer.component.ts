import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';
import { Contract } from 'src/app/model/Contract';
import { Request } from 'src/app/model/Request';
import { CommonService } from 'src/app/services/common/common.service';
import { ContractService } from 'src/app/services/contract/contract.service';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-list-request-customer',
  templateUrl: './list-request-customer.component.html',
  styleUrls: ['./list-request-customer.component.css']
})
export class ListRequestCustomerComponent implements OnInit {

  constructor(private dialog: MatDialog,
    private contractService: ContractService,
    private spinner: NgxSpinnerService,
    private common: CommonService,
    private customerService: CustomerService,
    private router: Router) { }

  page: number = 1;
  totalRecords: number;
  claimRequests: Array<Request>
  code_sender: string;

  ngOnInit(): void {
    this.code_sender = this.common.getCookie('name_customer');
    this.customerService.getAllCustomerRequest(this.code_sender).subscribe((data => {
      this.claimRequests = data;
      this.claimRequests.forEach(element => {
        element.status = this.common.transformStatus(element.status);
      });
      this.totalRecords = this.claimRequests.length;
    }))
  }

  public requestDetail(id_request: number) {
    // this.router.navigate(['claim-request-detail', id_request]);
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
        this.dateTo = new Date('3000-01-01');
        dateTo1 = this.dateTo.getFullYear() + "-" + (this.dateTo.getMonth() + 1) + "-" + this.dateTo.getDate()
      }
      else {
        dateTo1 = this.dateTo.toString();
      }
      let searchText = "%" + this.searchValue + "%";

      this.customerService.searchAllCustomerRequest(this.code_sender, dateFrom1, dateTo1, searchText).subscribe((data => {
        this.claimRequests = data;
        this.totalRecords = this.claimRequests.length;
        this.spinner.hide();
        this.page = 1;
      }))


    } catch (error) {
      console.log(error);
    }
  }

  ResetDate() {
    this.dateFrom = null;
    this.dateTo = null;
  }

  key = '';
  reverse: boolean = true;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

}
