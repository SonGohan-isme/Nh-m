import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerInfo } from 'src/app/model/CustomerInfo';
import { CommonService } from 'src/app/services/common/common.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { NgxSpinnerService } from 'ngx-spinner'
import { PauseCustomerDialogComponent } from 'src/app/view/dialog/pause-customer-dialog/pause-customer-dialog.component';
import { CustomerEditInfoComponent } from '../dialog/customer-edit-info/customer-edit-info.component';
import { ReportCustomerDialogComponent } from '../dialog/report-customer-dialog/report-customer-dialog.component';
import { Contract } from 'src/app/model/Contract';
import jwt_decode from "jwt-decode";
import { ContractDetailDialogComponent } from '../dialog/contract-detail-dialog/contract-detail-dialog.component';
import { ContractService } from 'src/app/services/contract/contract.service';
import { IllustrationDetailDialogComponent } from '../dialog/illustration-detail-dialog/illustration-detail-dialog.component';

@Component({
  selector: 'app-view-detail-customer',
  templateUrl: './view-detail-customer.component.html',
  styleUrls: ['./view-detail-customer.component.css']
})
export class ViewDetailCustomerComponent implements OnInit {

  constructor(private contractService: ContractService,private spinner : NgxSpinnerService,private common : CommonService,private customerService: CustomerService,private activateRoute: ActivatedRoute,private dialog : MatDialog,private router:Router) { }

  customerInfo = new CustomerInfo(0,new Date(),0,'','','','','','','','','','','','','','',0,0,0,0,'','','',0,'','','','','','','','','','','','','','','','','','',0,'',0,0,'',new Date(),0,new Date(),'',0);
  custInfoList:Array<CustomerInfo>;

  
  ngOnInit(): void {
    this.common.titlePage = "Thông Tin Chi Tiết Khách Hàng";
    this.spinner.show();
    this.customerService.getOneCustomerInfoBySaler(this.activateRoute.snapshot.params['id'],this.common.getCookie("token_key")).subscribe((data =>{
    this.customerInfo = data[0];
    this.custInfoList = data;
    this.spinner.hide();
  }))
}
  
  public openDialogEdit(){
    let dialogRef = this.dialog.open(CustomerEditInfoComponent,{
      height:'80%',
      width:'fit-content',
      data : this.customerInfo
    } );
    
    dialogRef.afterClosed().subscribe(result => {
      
    })
  }
  public openDialogReport(){
    let dialogRef = this.dialog.open(ReportCustomerDialogComponent);
    
    dialogRef.afterClosed().subscribe(result => {
      
    })
  }

  contract: Contract;
  public openDialogContractDetail(id_contract: number) {
    let data = { id: id_contract, code: jwt_decode(this.common.getCookie('token_key'))['sub'] }
    this.contractService.getDetailContract(data).subscribe((dataReturn => {
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
  
  public openDialogPause(){
    let dialogRef = this.dialog.open(PauseCustomerDialogComponent);
    this.getInfoOneCustomer();
  }

  public getInfoOneCustomer(){
    // this.activateRoute.queryParams.subscribe(params => {
    //   let id = params['id'];
    //   this.customerService.getOneAccCustomer(id).subscribe((data => {
    //     this.customerInfo = data;
    //   }));
    // });
    
  }
}
