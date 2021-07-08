import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomerInfo } from 'src/app/model/CustomerInfo';
import { CommonService } from 'src/app/services/common/common.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-profile-customer',
  templateUrl: './profile-customer.component.html',
  styleUrls: ['./profile-customer.component.css']
})
export class ProfileCustomerComponent implements OnInit {

  constructor(private common:CommonService,private snackBar:SnackbarService
    ,private spinner:NgxSpinnerService,private customerService:CustomerService) { }
  customerInfoList:Array<CustomerInfo>;
  customerInfo:CustomerInfo;

  ngOnInit(): void {
    this.spinner.show()
    this.customerService.getOneInfoCustomer(jwtDecode(this.common.getCookie('token_customer'))['sub']).subscribe((data => {
      this.customerInfoList = data;
      this.customerInfo = this.customerInfoList[0];
      this.spinner.hide();
    }))
  }

}
