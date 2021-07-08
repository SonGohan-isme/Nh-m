import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContractDTO } from 'src/app/model/ContractDTO';
import { ContractService } from 'src/app/services/contract/contract.service';
import { NgxSpinnerService } from 'ngx-spinner';
import jwt_decode from "jwt-decode";
import { CommonService } from 'src/app/services/common/common.service';
import { CustomerDetailDialogComponent } from '../../dialog/customer-detail-dialog/customer-detail-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Contract } from 'src/app/model/Contract';
import { ContractDetailDialogComponent } from '../../dialog/contract-detail-dialog/contract-detail-dialog.component';
import { IllustrationDetailDialogComponent } from '../../dialog/illustration-detail-dialog/illustration-detail-dialog.component';
import { forEach } from 'jszip';



@Component({
  selector: 'app-contract-table',
  templateUrl: './contract-table.component.html',
  styleUrls: ['./contract-table.component.css']
})
export class ContractTableComponent implements OnInit {

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

  public contractDetail(id: number) {
    this.router.navigate(['contract-detail', id]);
  }

  public refresh() {
    this.spinner.show();
    this.contractService.getAllContract(jwt_decode(this.common.getCookie('token_key'))['sub']).subscribe((data => {
      this.contracts = data;
      this.contracts.forEach(element => {
        element.approval_status = this.transformStatus(element.approval_status);
      });
      this.totalRecords = this.contracts.length;
      this.spinner.hide();
    }))
  }
  public openDialogCustomerDetail(id_customer: number) {
    let dialogRef = this.dialog.open(CustomerDetailDialogComponent, {
      height: '80%',
      width: 'fit-content',
      data: id_customer
    });
  }


  contract: Contract;
  public openDialogContractDetail(id_contract: number) {
    let data = { id: id_contract, code: jwt_decode(this.common.getCookie('token_key'))['sub'] }
    this.contractService.getDetailContract(data).subscribe((dataReturn => {
      this.contract = dataReturn;
      let dialogRef = this.dialog.open(ContractDetailDialogComponent, {
        data: this.contract
      });
    }))
  }

  public openDialogIllustrationDetail(id_illustration: number) {
    let dialogRef = this.dialog.open(IllustrationDetailDialogComponent, {
      height: '80%',
      width: 'fit-content',
      data: id_illustration
    });
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

      this.contractService.searchAllContract(jwt_decode(this.common.getCookie('token_key'))['sub'], dateFrom1, dateTo1, searchText).subscribe((data => {
        this.contracts = data;
        this.totalRecords = this.contracts.length;
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

  transformStatus(data: String) {
    switch (data) {
      case "CXD": return "Chưa xét duyệt";
      case "DXD": return "Đang chờ xét duyệt";
      case "DD": return "Đã duyệt";
      case "TC": return "Từ chối";
      case "YCT": return "Yêu cầu thêm";
    }
  }

}
