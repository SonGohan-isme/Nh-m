import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common/common.service';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-admin-customer-manage',
  templateUrl: './admin-customer-manage.component.html',
  styleUrls: ['./admin-customer-manage.component.css']
})
export class AdminCustomerManageComponent implements OnInit {

  pageTitle: string = "Danh Sách Khách Hàng";
  
  constructor(private common:CommonService,private all: CustomerService) {
    
   }
   
  ngOnInit(): void {
    this.common.titlePage = "Danh Sách Khách Hàng";
  }
}
