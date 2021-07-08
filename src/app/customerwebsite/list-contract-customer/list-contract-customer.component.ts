import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContractDTO } from 'src/app/model/ContractDTO';
import { CommonService } from 'src/app/services/common/common.service';
import jwt_decode from "jwt-decode";
import { ContractService } from 'src/app/services/contract/contract.service';
import { Contract } from 'src/app/model/Contract';
import { ContractDetailDialogComponent } from 'src/app/view/dialog/contract-detail-dialog/contract-detail-dialog.component';
import { CustomerDetailDialogComponent } from 'src/app/view/dialog/customer-detail-dialog/customer-detail-dialog.component';
import { IllustrationDetailDialogComponent } from 'src/app/view/dialog/illustration-detail-dialog/illustration-detail-dialog.component';

@Component({
  selector: 'app-list-contract-customer',
  templateUrl: './list-contract-customer.component.html',
  styleUrls: ['./list-contract-customer.component.css']
})
export class ListContractCustomerComponent implements OnInit {

  constructor(private dialog: MatDialog, private common: CommonService, private spinner: NgxSpinnerService, private contractService: ContractService, private router: Router) { }
  page: number = 1;
  totalRecords: number;
  contracts: Array<ContractDTO>;
  ngOnInit(): void {
    this.contractService.subsVar = this.contractService.
      callRefreshTable.subscribe((name: string) => {
        this.refresh();
      });
    this.refresh();
  }
  public refresh() {
    this.spinner.show();
    this.contractService.getAllContractForCustomer(jwt_decode(this.common.getCookie('token_customer'))['sub']).subscribe((data => {
      this.contracts = data;
      this.totalRecords = this.contracts.length;
      this.spinner.hide();
    }))
  }

  openDialogIllustrationDetail(id_illust:number){
    let dialogRef = this.dialog.open(IllustrationDetailDialogComponent,{
      height:'80%',
      data:id_illust
    }) 
  }

  contractDetail(id_contract:number){
    this.contractService.getOneContractDetailForCustomer(id_contract).subscribe((data => {
      this.dialog.open(ContractDetailDialogComponent,{
        height:'80%',
        width:'50%',
        data:data
      })
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
        this.dateTo = new Date('3000-01-01');
        dateTo1 = this.dateTo.getFullYear() + "-" + (this.dateTo.getMonth() + 1) + "-" + this.dateTo.getDate()
      }
      else {
        dateTo1 = this.dateTo.toString();
      }
      let searchText = "%" + this.searchValue + "%";
      
      // this.contractService.searchAllContract(jwt_decode(this.common.getCookie('token_key'))['sub'],dateFrom1,dateTo1,searchText).subscribe((data => {
      //   this.contracts = data;
      //   this.totalRecords = this.contracts.length;
      //   this.spinner.hide();
      //   this.page = 1;
      // }))
      this.contractService.searchAllContractForCustomer(jwt_decode(this.common.getCookie('token_customer'))['sub'],dateFrom1,dateTo1,searchText).subscribe((data => {
        this.contracts = data;
        this.totalRecords = this.contracts.length;
        this.page = 1;
        this.spinner.hide();
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
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
}
