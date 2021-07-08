import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomerInfo } from 'src/app/model/CustomerInfo';
import { CommonService } from 'src/app/services/common/common.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { RefertableService } from 'src/app/services/refertable/refertable.service';

@Component({
  selector: 'app-customer-detail-dialog',
  templateUrl: './customer-detail-dialog.component.html',
  styleUrls: ['./customer-detail-dialog.component.css']
})
export class CustomerDetailDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public id_customer: number, public customerService: CustomerService,
    public dialogRef: MatDialogRef<CustomerDetailDialogComponent>, private referTable: RefertableService, public common: CommonService, private spinner: NgxSpinnerService) { }

  customerInfo: CustomerInfo;
  custInfoList: Array<CustomerInfo>;
  ngOnInit(): void {
    this.spinner.show();
    this.customerService.getOneCustomerInfoBySaler(this.id_customer, this.common.getCookie("token_key")).subscribe((data => {
      this.customerInfo = data[0];
      this.custInfoList = data;
      this.spinner.hide();
    }))
  }
}

