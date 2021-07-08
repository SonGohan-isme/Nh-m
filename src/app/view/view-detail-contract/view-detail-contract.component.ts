import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import jwt_decode from 'jwt-decode';
import { Contract } from 'src/app/model/Contract';
import { ContractChangeHistory } from 'src/app/model/ContractChangeHistory';
import { ContractDTO } from 'src/app/model/ContractDTO';
import { FeePaymentHistory } from 'src/app/model/FeePaymentHistory';
import { IntersetPaymentHistory } from 'src/app/model/IntersetPaymentHistory';
import { Referencetable } from 'src/app/model/Referencetable';
import { AuthenService } from 'src/app/services/authen/authen.service';
import { ContractService } from 'src/app/services/contract/contract.service';
import { RefertableService } from 'src/app/services/refertable/refertable.service';
import { AddRequestComponent } from '../dialog/add-request/add-request/add-request.component';
import { ContractChangeInfoDialogComponent } from '../dialog/contract-change-info-dialog/contract-change-info-dialog.component';
import { ContractPauseDialogComponent } from '../dialog/contract-pause-dialog/contract-pause-dialog.component';
import { CommonService } from 'src/app/services/common/common.service';
import jwtDecode from 'jwt-decode';
import * as gcs from '@google-cloud/storage';
import path from 'path';
import { FileManagementService } from 'src/app/services/fileManagement/file-management.service';
import { HttpClient } from '@angular/common/http';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { CustomerAttachment } from 'src/app/model/CustomerAttachment';


@Component({
  selector: 'app-view-detail-contract',
  templateUrl: './view-detail-contract.component.html',
  styleUrls: ['./view-detail-contract.component.css']
})
export class ViewDetailContractComponent implements OnInit {


  id: number;
  listDocument = new Array<CustomerAttachment>();
  ref: Referencetable;
  payment_period: string;
  contracts: ContractDTO;
  selectedFile = new Array<File>();
  contractchanges: Array<ContractChangeHistory>;

  constructor(
    private snackBar: SnackbarService,
    private httpClient: HttpClient,
    private fileService: FileManagementService,
    private common: CommonService, private spinner: NgxSpinnerService,
    private referTable: RefertableService, public authenService: AuthenService,
    private route: ActivatedRoute, private router: Router, private contractService: ContractService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.common.titlePage = "Thông Tin Chi Tiết Hợp Đồng";
    this.contractService.subsVar = this.contractService.
      callRefreshTable.subscribe((name: string) => {
        this.refresh();
      });
    this.refresh();


  }

  onChangeFile(event) {
    if (event.target.files[0].size > 1048576) {
      this.snackBar.openSnackBar("Dung Lượng File Cần Nhỏ Hơn Hoặc Bằng 1Mb", "Đóng");
      return;
    }
    this.selectedFile.push(event.target.files[0]);
  }

  onUpload() {
    if (this.selectedFile.length != 0) {
      this.spinner.show();
      const uploadImageData = new FormData();
      this.selectedFile.forEach(file => {
        uploadImageData.append('fileData', file, file.name);
      });
      this.fileService.uploadFileCustomer(uploadImageData).subscribe((data => {
        if (data['body'] != null) {
          let listFileSave = Array<CustomerAttachment>();
          for (let i = 0; i < this.selectedFile.length; i++) {
            listFileSave.push(new CustomerAttachment(data['body'][i][1], this.selectedFile[i].name, data['body'][i][0], null, this.contracts.id));
          }
          this.fileService.saveFile(listFileSave).subscribe((data => {
            this.refresh();
            this.selectedFile = [];
            this.snackBar.openSnackBar("Upload File Thành Công!", "Đóng");
          }))
        }
      }))
    } else {
      this.snackBar.openSnackBar("Vui Lòng Chọn Ít Nhất 1 File Để Tải Lên", "Đóng");
    }
  }

  public contractChangeDetail(id: number) {
    this.router.navigate(['detai-history-change', id]);
  }
  public openDialogChange() {
    let dialogRef = this.dialog.open(ContractChangeInfoDialogComponent, { data: this.contracts });

    dialogRef.afterClosed().subscribe(result => {

    })
  }
  openDialogSendRequest() {
    let dialogRef = this.dialog.open(AddRequestComponent, { data: this.contracts });
    dialogRef.afterClosed().subscribe(result => {

    })
  }
  public openDialogPause() {
    let dialogRef = this.dialog.open(ContractPauseDialogComponent);

    dialogRef.afterClosed().subscribe(result => {

    })
  }

  removeFile(index: number) {
    if (index > -1) {
      this.selectedFile.splice(index, 1)
    }
  }

  public refresh() {
    this.spinner.show();
    this.id = this.route.snapshot.params['id'];
    let data = { id: this.id, code: jwtDecode(this.common.getCookie('token_key'))['sub'] }
    this.contractService.getDetailContract(data).subscribe((data => {
      this.contracts = data;
      switch (this.contracts.approval_status) {
        case "CXD": this.contracts.approval_status = "Chưa Xét Duyệt"; break;
        case "DXD": this.contracts.approval_status = "Đang Chờ Xét Duyệt"; break;
        case "DD": this.contracts.approval_status = "Đã Duyệt"; break;
        case "TC": this.contracts.approval_status = "Từ Chối"; break;
        case "YCT": this.contracts.approval_status = "Yêu Cầu Thêm"; break;
      }
      this.referTable.getAllReference().subscribe((data => {
        this.ref = data;
        this.payment_period = this.ref.multiplierForPaymentPeriod.find(i => i.id == this.contracts.payment_period_id)['description'];
        this.fileService.getFile(this.contracts.id).subscribe((data => {
          this.listDocument = data;
          this.spinner.hide();
        }))
      }))
    }))
  }
}
