import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomerInfo } from 'src/app/model/CustomerInfo';
import jwt_decode from "jwt-decode";
import { CommonService } from 'src/app/services/common/common.service';
import { ContractService } from 'src/app/services/contract/contract.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { ContractDetailDialogComponent } from 'src/app/view/dialog/contract-detail-dialog/contract-detail-dialog.component';
import { CustomerEditInfoComponent } from 'src/app/view/dialog/customer-edit-info/customer-edit-info.component';
import { IllustrationDetailDialogComponent } from 'src/app/view/dialog/illustration-detail-dialog/illustration-detail-dialog.component';
import { Contract } from 'src/app/model/Contract';

@Component({
  selector: 'app-view-detail-customer-admin',
  templateUrl: './view-detail-customer-admin.component.html',
  styleUrls: ['./view-detail-customer-admin.component.css']
})
export class ViewDetailCustomerAdminComponent implements OnInit {

  constructor(private contractService: ContractService,private spinner : NgxSpinnerService,private common : CommonService,private customerService: CustomerService,private activateRoute: ActivatedRoute,private dialog : MatDialog,private router:Router ) { }

  customerInfo:CustomerInfo;
  custInfoList:Array<CustomerInfo>;
  ngOnInit(): void {
    this.common.titlePage = "Chi Tiết Khách Hàng";
    this.spinner.show();
  this.customerService.getDetailCustomerInfoAdmin(this.activateRoute.snapshot.params['id']).subscribe((data =>{
    this.customerInfo = data[0];
    this.custInfoList = data;
    this.spinner.hide();
  }))
  }
  openDialogEdit(){
    let dialogRef = this.dialog.open(CustomerEditInfoComponent,{data : this.customerInfo} );
    
    dialogRef.afterClosed().subscribe(result => {
      
    })
  }

  contract: Contract;
  public openDialogContractDetail(id_contract: number) {
    this.contractService.getDetailContractForCustomer(id_contract).subscribe((dataReturn => {
      this.contract = dataReturn;
      let dialogRef = this.dialog.open(ContractDetailDialogComponent, {
        height:'80%',
        width:'fit-content',
        data: this.contract
      });
    }))
  }

  public openDialogIllustrationDetail(id_illustration: number) {
    let dialogRef = this.dialog.open(IllustrationDetailDialogComponent, {
      height:'80%',
      width:'fit-content',
      data: id_illustration
    });
  }
}
