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
  selector: 'app-claim-request-manage',
  templateUrl: './claim-request-manage.component.html',
  styleUrls: ['./claim-request-manage.component.css']
})
export class ClaimRequestManageComponent implements OnInit {

  constructor(private dialog: MatDialog,
    private contractService: ContractService,
    private spinner: NgxSpinnerService,
    private common: CommonService,
    private contractRequestService: ContractrequestService,
    private router: Router) { }

  pageApprovals: number = 1;
  pageApproved: number = 1;
  pageRequest: number = 1;
  totalRecordsApprovals: number;
  totalRecordsRequest: number;
  totalRecordsApproveds: number;
  contractRequests: Array<Request>
  contractRequestsApprovals: Array<Request>
  contractRequestsApproveds: Array<Request>
  ngOnInit(): void {
    this.common.titlePage = "Danh Sách Yêu Cầu Bồi Thường Bảo Hiểm";
    this.contractRequestService.getAllClaimRequest(jwtDecode(this.common.getCookie('token_key'))['sub']).subscribe((data => {
      this.contractRequests = data;
      this.totalRecordsRequest = this.contractRequests.length;
    }))
    this.contractRequestService.getAllClaimRequestApproval(jwtDecode(this.common.getCookie('token_key'))['sub']).subscribe((data => {
      this.contractRequestsApprovals = data;
      this.contractRequestsApprovals.forEach(element => {
        element.status = this.common.transformStatus(element.status);
      });
      this.totalRecordsApprovals = this.contractRequestsApprovals.length;
    }))
    this.contractRequestService.getAllApprovedClaimRequest(jwtDecode(this.common.getCookie('token_key'))['sub']).subscribe((data => {
      this.contractRequestsApproveds = data;
      this.contractRequestsApproveds.forEach(element => {
        element.status = this.common.transformStatus(element.status);
      });
      this.totalRecordsApproveds = this.contractRequestsApproveds.length;
    }))
  }

  public requestDetail(id_request: number) {
    this.router.navigate(['claim-request-detail', id_request]);
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

      this.contractRequestService.searchAllClaimRequest(jwtDecode(this.common.getCookie('token_key'))['sub'], dateFrom1, dateTo1, searchText).subscribe((data => {
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


      this.contractRequestService.searchAllClaimRequestApproval(jwtDecode(this.common.getCookie('token_key'))['sub'], dateFrom1, dateTo1, searchText).subscribe((data => {
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

  searchValueApproved: String = "";
  dateFromApproved: Date;
  dateToApproved: Date;
  SearchApproved() {
    this.spinner.show();
    try {
      let dateTo1: String;
      let dateFrom1: String;
      let dateToValue = (<HTMLInputElement>document.getElementById('RtoSearchApproved')).value;
      let dateFromValue = (<HTMLInputElement>document.getElementById('RfromSearchApproved')).value;
      if (dateFromValue == "") {
        this.dateFromApproved = new Date('1990-01-01');
        dateFrom1 = this.dateFromApproved.getFullYear() + "-" + (this.dateFromApproved.getMonth() + 1) + "-" + this.dateFromApproved.getDate()
      } else {
        dateFrom1 = this.dateFromApproved.toString();
      }

      if (dateToValue == "") {
        this.dateToApproved = new Date('3000-01-01');
        dateTo1 = this.dateToApproved.getFullYear() + "-" + (this.dateToApproved.getMonth() + 1) + "-" + this.dateToApproved.getDate()
      }
      else {
        dateTo1 = this.dateToApproved.toString();
      }
      let searchText = "%" + this.searchValueApproved + "%";


      this.contractRequestService.searchAllApprovedClaimRequest(jwtDecode(this.common.getCookie('token_key'))['sub'], dateFrom1, dateTo1, searchText).subscribe((data => {
        this.contractRequestsApproveds = data;
        this.totalRecordsApproveds = this.contractRequestsApproveds.length;
        this.spinner.hide();
        this.pageApproved = 1;
      }))

    } catch (error) {
      console.log(error);
    }
  }

  ResetDateApproved() {
    this.dateFromApproved = null;
    this.dateToApproved = null;
  }

  key = '';
  reverse: boolean = true;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

}
