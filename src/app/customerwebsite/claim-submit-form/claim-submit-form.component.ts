import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomerAttachment } from 'src/app/model/CustomerAttachment';
import { Request } from 'src/app/model/Request';
import { RequestAttachment } from 'src/app/model/RequestAttachment';
import { AuthenService } from 'src/app/services/authen/authen.service';
import { CommonService } from 'src/app/services/common/common.service';
import { ContractService } from 'src/app/services/contract/contract.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { FileManagementService } from 'src/app/services/fileManagement/file-management.service';
import { RefertableService } from 'src/app/services/refertable/refertable.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { ContractrequestService } from 'src/app/services/contractRequest/contractrequest.service';
import { CustomerWebServiceService } from 'src/app/services/customer-web-service/customer-web-service.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { ContractDTO } from 'src/app/model/ContractDTO';
import { FormControl } from '@angular/forms';
import { Contract } from 'src/app/model/Contract';
import { SubBenefitScale } from 'src/app/model/SubBenefitScale';
import { MainBenefitScale } from 'src/app/model/MainBenefitScale';
import { IllustrationService } from 'src/app/services/illustration/illustration.service';

@Component({
  selector: 'app-claim-submit-form',
  templateUrl: './claim-submit-form.component.html',
  styleUrls: ['./claim-submit-form.component.css']
})
export class ClaimSubmitFormComponent implements OnInit {

  contract: Contract;
  code_sender: string;
  id_contract: number;
  name: string;
  listDocument = new Array<RequestAttachment>();
  payment_period: string;
  selectedFile = new Array<File>();
  req: Request;
  listContracts: Array<ContractDTO>;
  selectContract: FormControl = new FormControl();
  selectBenefit: FormControl = new FormControl();
  listSubBenefitScale: Array<SubBenefitScale> = [];
  listMainBenefitScale: Array<MainBenefitScale> = [];
  listSubScale: Array<SubBenefitScale> = [];

  constructor(private snackBar: SnackbarService, private cusService: CustomerService, private illustSer: IllustrationService,
    private fileService: FileManagementService, private reqService: ContractrequestService,
    private common: CommonService, private spinner: NgxSpinnerService,
    private referTable: RefertableService, public authenService: AuthenService,
    private route: ActivatedRoute, private router: Router, private contractService: ContractService,
    private dialog: MatDialog, private EmAccService: EmployeeService) { }

  ngOnInit(): void {
    let token_customer = this.common.getCookie('token_customer');
    if (!token_customer) {
      this.router.navigate(['login-customerweb']);
    } else {
      this.contractService.getAllContractForCustomer(jwt_decode(this.common.getCookie('token_customer'))['sub']).subscribe((data => {
        this.listContracts = data;
      }));
    }

  }

  onChangeContract(id_contract: number) {
    this.cusService.getDetailContractForCustomer(id_contract).subscribe((data => {
      this.contract = data;

      this.cusService.getAllSubBenefitById(this.contract.id_illustration).subscribe((data => {
        for (var i = 0; i < data.length; i++) {
          this.cusService.getAllSubBenefitScaleBySubBenefitId(data[i].id_sub_benifit).subscribe((data1 => {
            this.listSubScale = data1;
            for (var j = 0; j < this.listSubScale.length; j++) {
              let subBenefitScale = new SubBenefitScale(
                this.listSubScale[j].id,
                this.listSubScale[j].name,
                this.listSubScale[j].scale,
                this.listSubScale[j].id_sub_benefit
              )
              this.listSubBenefitScale.push(subBenefitScale);
            }
          }))
        }
      }))
      this.cusService.getAllMainBenefitScaleByMainBenefitId(this.contract.id_main_benifit).subscribe((data => {
        this.listMainBenefitScale = data;
      }))

    }))
  }

  dowloadPDF() {
    window.print();
  }

  onChangeFile(event) {
    if (event.target.files[0].size > 1048576) {
      this.snackBar.openSnackBar("Dung Lượng File Cần Nhỏ Hơn Hoặc Bằng 1Mb", "Đóng");
      return;
    }
    this.selectedFile.push(event.target.files[0]);
  }

  removeFile(index: number) {
    if (index > -1) {
      this.selectedFile.splice(index, 1)
    }
  }

  sendReq() {
    this.spinner.show();
    this.req = new Request(0, this.name, 2, new Date(), 1, this.code_sender, '', '', 'Cao', this.selectContract.value, 'CXD');

    this.cusService.addOneCustomerRequest(this.req).subscribe((reqData => {
      if (this.selectedFile.length != 0) {
        const uploadImageData = new FormData();
        this.selectedFile.forEach(file => {
          uploadImageData.append('fileData', file, file.name);
        });
        this.cusService.uploadCustomerFileRequest(uploadImageData).subscribe((data => {
          if (data['body'] != null) {
            let listFileSave = Array<RequestAttachment>();
            for (let i = 0; i < this.selectedFile.length; i++) {
              listFileSave.push(new RequestAttachment(data['body'][i][1], this.selectedFile[i].name, data['body'][i][0], reqData.id));
            }
            this.cusService.saveCustomerFileRequest(listFileSave).subscribe((data1 => {
            }))
          }
        }))
      } else {
        this.snackBar.openSnackBar("Vui Lòng Chọn Ít Nhất 1 File Để Tải Lên", "Đóng");
      }
      this.spinner.hide();
      this.snackBar.openSnackBar("Gửi Yêu Cầu Thành Công", "Đóng");
    }))
  }
}
