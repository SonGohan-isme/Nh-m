import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Request } from 'src/app/model/Request';
import jwt_decode from 'jwt-decode';
import { ContractrequestService } from 'src/app/services/contractRequest/contractrequest.service';
import { CommonService } from 'src/app/services/common/common.service';
import jwtDecode from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContractService } from 'src/app/services/contract/contract.service';
import { Contract } from 'src/app/model/Contract';
import { MatDialog } from '@angular/material/dialog';
import { ContractDetailDialogComponent } from '../dialog/contract-detail-dialog/contract-detail-dialog.component';

@Component({
  selector: 'app-appraiser-request-manage',
  templateUrl: './appraiser-request-manage.component.html',
  styleUrls: ['./appraiser-request-manage.component.css']
})
export class AppraiserRequestManageComponent implements OnInit {

  constructor(private dialog: MatDialog,
    private contractService: ContractService,
    private spinner: NgxSpinnerService,
    private common: CommonService,
    private contractRequestService: ContractrequestService,
    private router: Router) { }

  pageApprovals: number = 1;
  pageRequest: number = 1;
  totalRecordsApprovals: number;
  totalRecordsRequest: number;
  contractRequests: Array<Request>
  contractRequestsApprovals: Array<Request>
  ngOnInit(): void {
    this.common.titlePage = "Danh Sách Hồ Sơ Yêu Cầu Bảo Hiểm";
    this.contractRequestService.getAllContractRequest(jwtDecode(this.common.getCookie('token_key'))['sub']).subscribe((data => {
      this.contractRequests = data;
      this.totalRecordsRequest = this.contractRequests.length;
    }))
    this.contractRequestService.getAllContractRequestApproval(jwtDecode(this.common.getCookie('token_key'))['sub']).subscribe((data => {
      this.contractRequestsApprovals = data;
      this.contractRequestsApprovals.forEach(element => {
        element.status = this.common.transformStatus(element.status);
      });
      this.totalRecordsApprovals = this.contractRequestsApprovals.length;
    }))

  }

  public requestDetail(id_request: number) {
    this.router.navigate(['appraiser-request-detail', id_request]);
  }

  contract: Contract;
  public openDialogContractDetail(id_contract: number, code1: string) {
    let data = { id: id_contract, code: code1 }
    this.contractService.getDetailContract(data).subscribe((dataReturn => {
      this.contract = dataReturn;
      let dialogRef = this.dialog.open(ContractDetailDialogComponent, {
        height: '80%',
        width: '50%',
        data: this.contract
      });
    }))
  }

  searchValueRequest: String = "";
  dateFromRequest: Date;
  dateToRequest: Date;

  SearchRequest() {
    this.spinner.show();
    try {
      let dateTo1: String;
      let dateFrom1: String;
      let dateToValue = (<HTMLInputElement>document.getElementById('RtoSearchRequest')).value;
      let dateFromValue = (<HTMLInputElement>document.getElementById('RfromSearchRequest')).value;
      if (dateFromValue == "") {
        this.dateFromRequest = new Date('1990-01-01');
        dateFrom1 = this.dateFromRequest.getFullYear() + "-" + (this.dateFromRequest.getMonth() + 1) + "-" + this.dateFromRequest.getDate()
      } else {
        dateFrom1 = this.dateFromRequest.toString();
      }

      if (dateToValue == "") {
        this.dateToRequest = new Date('3000-01-01');
        dateTo1 = this.dateToRequest.getFullYear() + "-" + (this.dateToRequest.getMonth() + 1) + "-" + this.dateToRequest.getDate()
      }
      else {
        dateTo1 = this.dateToRequest.toString();
      }
      let searchText = "%" + this.searchValueRequest + "%";

      this.contractRequestService.searchAllContractRequest(jwtDecode(this.common.getCookie('token_key'))['sub'], dateFrom1, dateTo1, searchText).subscribe((data => {
        this.contractRequests = data;
        this.totalRecordsRequest = this.contractRequests.length;
        this.spinner.hide();
        this.pageRequest = 1;
      }))


    } catch (error) {
      console.log(error);
    }
  }

  ResetDateRequest() {
    this.dateFromRequest = null;
    this.dateToRequest = null;
  }


  searchValueApproval: String = "";
  dateFromApproval: Date;
  dateToApproval: Date;
  SearchApproval() {
    this.spinner.show();
    try {
      let dateTo1: String;
      let dateFrom1: String;
      let dateToValue = (<HTMLInputElement>document.getElementById('RtoSearchApproval')).value;
      let dateFromValue = (<HTMLInputElement>document.getElementById('RfromSearchApproval')).value;
      if (dateFromValue == "") {
        this.dateFromApproval = new Date('1990-01-01');
        dateFrom1 = this.dateFromApproval.getFullYear() + "-" + (this.dateFromApproval.getMonth() + 1) + "-" + this.dateFromApproval.getDate()
      } else {
        dateFrom1 = this.dateFromApproval.toString();
      }

      if (dateToValue == "") {
        this.dateToApproval = new Date('3000-01-01');
        dateTo1 = this.dateToApproval.getFullYear() + "-" + (this.dateToApproval.getMonth() + 1) + "-" + this.dateToApproval.getDate()
      }
      else {
        dateTo1 = this.dateToApproval.toString();
      }
      let searchText = "%" + this.searchValueApproval + "%";


      this.contractRequestService.searchAllContractRequestApproval(jwtDecode(this.common.getCookie('token_key'))['sub'], dateFrom1, dateTo1, searchText).subscribe((data => {
        this.contractRequestsApprovals = data;
        this.totalRecordsApprovals = this.contractRequestsApprovals.length;
        this.spinner.hide();
        this.pageApprovals = 1;
      }))

    } catch (error) {
      console.log(error);
    }
  }

  ResetDateApproval() {
    this.dateFromApproval = null;
    this.dateToApproval = null;
  }

  key = '';
  reverse: boolean = true;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

}
