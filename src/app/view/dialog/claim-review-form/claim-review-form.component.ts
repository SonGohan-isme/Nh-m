import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Contract } from 'src/app/model/Contract';
import { Illustration } from 'src/app/model/Illustration';
import { Request } from 'src/app/model/Request';
import { Revenue } from 'src/app/model/Revenue';
import { ContractService } from 'src/app/services/contract/contract.service';
import { DetailCommissonService } from 'src/app/services/detailCommisson/detail-commisson.service';
import { IllustrationService } from 'src/app/services/illustration/illustration.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { RevenueService } from 'src/app/services/revenue/revenue.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { MainBenefitScale } from 'src/app/model/MainBenefitScale';
import { SubBenefitScale } from 'src/app/model/SubBenefitScale';
import { ContractrequestService } from 'src/app/services/contractRequest/contractrequest.service';
import { IllustrationSubBenifit } from 'src/app/model/IllustrationSubBenifit';
import { RelatedPersonInfo } from 'src/app/model/RelatedPersonInfo';
import { Benifit } from 'src/app/model/Benifit';
import { RequestClaimApprove } from 'src/app/model/RequestClaimApprove';
import { IllustrationMainBenifit } from 'src/app/model/IllustrationMainBenifit';
import { TemplatePortal } from '@angular/cdk/portal';
import { CustomerNotification } from 'src/app/model/CustomerNotification';

@Component({
  selector: 'app-claim-review-form',
  templateUrl: './claim-review-form.component.html',
  styleUrls: ['./claim-review-form.component.css']
})
export class ClaimReviewFormComponent implements OnInit {
  contract: Contract;
  illustrationCopy: Illustration;
  revenue = new Revenue(0, '', 0, 0, 0, new Date());
  illustration: Illustration;
  approveStatus: string;
  amountMoney: number;
  description: string;
  requestClaim: RequestClaimApprove;
  priority: string;
  listRelatedPersonNumber: Number[] = [];
  listSubRelatedPerSonBig: Array<any> = [];
  listSubRelatedPerSonSmall: IllustrationSubBenifit[] = [];
  listRelatedPerSonInfo: Array<RelatedPersonInfo> = [];
  listSubBenifit: Array<Benifit> = [];
  illustrationSubBenefit: IllustrationSubBenifit;
  listSubBenefitScale: Array<SubBenefitScale> = [];
  listSubScale: Array<SubBenefitScale> = [];
  listMainBenefitScale: Array<MainBenefitScale> = [];
  listSub: Array<IllustrationSubBenifit> = [];
  dateNow: Date;
  ids: number[];
  mainBenefit: IllustrationMainBenifit;
  value1 = 0;
  value2 = 0;

  constructor(@Inject(MAT_DIALOG_DATA)
  public req: Request, public contractService: ContractService, private revenueSer: RevenueService,
    private commissionSer: DetailCommissonService, private custService: CustomerService,
    private illustSer: IllustrationService, private snackBar: SnackbarService, private spinner: NgxSpinnerService,
    private contractRequestService: ContractrequestService, private activateRoute: ActivatedRoute,
    private router: Router) { }
  ngOnInit(): void {
    // this.approveStatus = "DX";
    // this.amountMoney = 0;
    this.dateNow = new Date();

    this.contractService.getDetailContractForCustomer(this.req.id_contract).subscribe((data => {
      this.contract = data;

      this.illustSer.getAllSubBenefitById(this.contract.id_illustration).subscribe((data => {
        for (var i = 0; i < data.length; i++) {
          this.illustSer.getAllSubBenefitScaleBySubBenefitId(data[i].id_sub_benifit).subscribe((data1 => {
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

      //lay illMainBenefit
      this.illustSer.getMainBenefitById(this.contract.id_illustration).subscribe((data => {
        this.mainBenefit = data;
      }))

      this.illustSer.getAllSubBenefitById(this.contract.id_illustration).subscribe((data => {
        this.listSub = data;
      }))

      this.illustSer.getAllMainBenefitScaleByMainBenefitId(this.contract.id_main_benifit).subscribe((data => {
        this.listMainBenefitScale = data;
      }))

    }))
  }

  Review() {

    this.spinner.show();
    this.requestClaim = new RequestClaimApprove(0, this.req.name, this.dateNow, this.req.code_sender,
      this.description, this.amountMoney, this.req.id_contract, this.approveStatus, this.priority);
    if (this.approveStatus == "DX") {
      this.contractRequestService.setStatusRequest(this.req.id, this.description, this.approveStatus).subscribe((data => {
        this.contractRequestService.addClaimRequest(this.requestClaim).subscribe((data => {
          let noti = new CustomerNotification(0, this.contract.id_customer, this.req.name, "Yêu cầu của bạn đã được đề xuất thanh toán!", "list-request-customer", 1, new Date());
          this.contractRequestService.addOneNotification(noti).subscribe((noti => {
            this.spinner.hide();
            this.snackBar.openSnackBar("Xử Lý Yêu Cầu Thành Công", "Đóng");
            this.router.navigate(['claim-request-manage']);
          }))
        }))
      }))
    } else if (this.approveStatus == "YCT") {
      this.contractRequestService.setStatusRequest(this.req.id, this.description, this.approveStatus).subscribe((data => {
        let noti = new CustomerNotification(0, this.contract.id_customer, this.req.name, "Yêu cầu của bạn cần bổ sung thêm tài liệu!", "list-request-customer", 1, new Date());
        this.contractRequestService.addOneNotification(noti).subscribe((noti => {
          this.spinner.hide();
          this.snackBar.openSnackBar("Xử Lý Yêu Cầu Thành Công", "Đóng");
          this.router.navigate(['claim-request-manage']);
        }))
      }))
    } else {
      this.contractRequestService.setStatusRequest(this.req.id, this.description, this.approveStatus).subscribe((data => {
        let noti = new CustomerNotification(0, this.contract.id_customer, this.req.name, "Yêu cầu của bạn đã bị từ chối!", "list-request-customer", 1, new Date());
        this.contractRequestService.addOneNotification(noti).subscribe((noti => {
          this.spinner.hide();
          this.snackBar.openSnackBar("Xử Lý Yêu Cầu Thành Công", "Đóng");
          this.router.navigate(['claim-request-manage']);
        }))
      }))
    }
  }

  handleChange1(value) {
    this.value1 = value;
    this.amountMoney = this.value2 + this.value1;
  }

  handleChange2(value) {
    this.value2 = value;
    this.amountMoney = this.value2 + this.value1;
  }
}