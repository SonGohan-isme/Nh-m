import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { CustomerInfo } from 'src/app/model/CustomerInfo';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { CustomerEditInfoComponent } from '../../dialog/customer-edit-info/customer-edit-info.component';
import { CommonService } from 'src/app/services/common/common.service';
import { ContractDetailDialogComponent } from '../../dialog/contract-detail-dialog/contract-detail-dialog.component';
import { ContractService } from 'src/app/services/contract/contract.service';
import { Contract } from 'src/app/model/Contract';
import { IllustrationDetailDialogComponent } from '../../dialog/illustration-detail-dialog/illustration-detail-dialog.component';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.css']
})
export class CustomerTableComponent implements OnInit {

  constructor(private contractService : ContractService,private changeDetectorRefs: ChangeDetectorRef, private common: CommonService, private dialog: MatDialog, public customerService: CustomerService, private router: Router, private spinner: NgxSpinnerService) {

  }
  check = false;
  dtOptions:any;
  customerinfos: Array<CustomerInfo>;
  page: number = 1;
  totalRecords: number;
  searchValue: String = "";
  dateFrom: Date;
  dateTo: Date;

  ngOnInit(): void {
    
    this.customerService.subsVar = this.customerService.
      callRefreshTable.subscribe((name: string) => {
        this.refresh();
      });
      this.refresh();
  }

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
      this.customerService.searchAllCustomer(jwt_decode(this.common.getCookie('token_key'))['sub'], this.dateFrom.toString(), dateTo1.toString(), searchText.toString()).subscribe((data => {
        this.customerinfos = data;
        this.totalRecords = this.customerinfos.length;
        this.spinner.hide();
        this.page = 1;
      }))

    } catch (error) {
      console.log(error);
    }
  }

  ResetDate(){
  this.dateFrom = null;
  this.dateTo = null;
  }


  public customerDetail(id: number) {
    this.router.navigate(['customer-detail', id]);
  }

  public editDrafCustomerInfo(customerInfo: CustomerInfo) {
    let dialogRef = this.dialog.open(CustomerEditInfoComponent, { 
      height: '80%',
      width: 'fit-content',
      data: customerInfo 
    });
    dialogRef.afterClosed().subscribe(result => {

    })
  }

  contract : Contract;
  public openDialogContractDetail(id_contract:number){
    let data = {id:id_contract,code:jwt_decode(this.common.getCookie('token_key'))['sub']}
    this.contractService.getDetailContract(data).subscribe((dataReturn =>{
      this.contract = dataReturn;
      let dialogRef = this.dialog.open(ContractDetailDialogComponent,{
        height:'80%',
        width:'50%',
        data:this.contract
      });
    }))
  }

  public openDialogIllustrationDetail(id_illustration:number){
      let dialogRef = this.dialog.open(IllustrationDetailDialogComponent,{
        height:'80%',
        width:'fit-content',
        data:id_illustration   
    });
  }
  
  public refresh() {
    this.spinner.show();
    this.customerService.getAllCustomerInfo(jwt_decode(this.common.getCookie('token_key'))['sub']).subscribe((data => {
      this.customerinfos = data;
      this.totalRecords = data.length;
      this.spinner.hide();
    }))
  }

  key = '';
  reverse: boolean = true;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
}
