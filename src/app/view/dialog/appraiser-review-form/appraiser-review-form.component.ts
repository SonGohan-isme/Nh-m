import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Contract } from 'src/app/model/Contract';
import { Illustration } from 'src/app/model/Illustration';
import { Request } from 'src/app/model/Request';
import { Revenue } from 'src/app/model/Revenue';
import { ContractService } from 'src/app/services/contract/contract.service';
import { DetailCommissonService } from 'src/app/services/detailCommisson/detail-commisson.service';
import { IllustrationService } from 'src/app/services/illustration/illustration.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import jwt_decode from "jwt-decode";
import { CommonService } from 'src/app/services/common/common.service';
import { RevenueService } from 'src/app/services/revenue/revenue.service';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-appraiser-review-form',
  templateUrl: './appraiser-review-form.component.html',
  styleUrls: ['./appraiser-review-form.component.css']
})
export class AppraiserReviewFormComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA)
  public req: Request, public contractService: ContractService, private revenueSer: RevenueService,
    private common: CommonService, private commissionSer: DetailCommissonService, private custService: CustomerService,
    private illustSer: IllustrationService, private snackBar: SnackbarService, private spinner: NgxSpinnerService,
    private router: Router) { }
  description: String;
  ngOnInit(): void {
    this.approveStatus = "DD";
  }
  revenue = new Revenue(0, '', 0, 0, 0, new Date());
  illustration: Illustration;
  approveStatus: string;
  Review() {
    this.spinner.show();
    if (this.approveStatus == "DD") {
      this.contractService.setStatusContract(this.req.id_contract, this.req.id, this.description, this.approveStatus).subscribe((data => {
        // set tr???ng th??i cho h???p ?????ng v?? request
        let data1 = { id: this.req.id_contract, code: this.req.code_sender };
        this.contractService.getDetailContract(data1).subscribe((data => {
          // l???y t???t c??? th??ng tin c???a b???ng minh h???a
          this.illustSer.getIllustrationContractCreate(data['id_illustration']).subscribe((data => {
            this.illustration = data;
            let dataCommission = {
              payment_period_id: data['payment_period_id'],
              denomination: data['illustrationMainBenifit'].denominations
            }
            // l???y h??? s??? commisson ????? t??nh thu nh???p cho nh??n vi??n
            this.commissionSer.getOneCommisson(dataCommission).subscribe((data => {
              this.revenue.id_contract = this.req.id_contract;
              this.revenue.code_employee = this.req.code_sender;
              this.revenue.income = data['commission'] * this.illustration.total_fee;
              // if(this.illustration.illustrationMainBenifit.denominations != 0){
              //   if(this.illustration.illustrationSubBenifitList != null){
              //     this.revenue.revenue_val = this.revenue.revenue_val+this.illustration.illustrationMainBenifit.denominations;
              //     this.illustration.illustrationSubBenifitList.forEach(a => this.revenue.revenue_val += a.denominations)
              //   } else {
              //     this.revenue.revenue_val = this.illustration.illustrationMainBenifit.denominations;
              //   }

              // }else {
              //   this.revenue.revenue_val = 0;
              // }
              // doanh thu c???a 1 h???p ?????ng s??? b???ng t???ng ph?? b???o hi???m ????ng theo k??? h???n
              this.revenue.revenue_val = this.illustration.total_fee;
              // g???i th??ng tin t??i kho???n v?? password cho kh??ch h??ng khi x??t duy???t h???p ?????ng l???n ?????u ti??n
              this.custService.sendOneAccCustomer((this.illustration.id_customer_info)).subscribe((data => {
                this.revenueSer.addOneRevenue(this.revenue).subscribe((data => {
                  this.spinner.hide();
                  this.snackBar.openSnackBar("X??? L?? Y??u C???u Th??nh C??ng", "????ng");
                  this.router.navigate(['appraiser-request-manage']);
                }))
              }))
            }))
          }))
        }))
      }))
    }
    else {
      this.contractService.setStatusContract(this.req.id_contract, this.req.id, this.description, this.approveStatus).subscribe((data => {
        this.spinner.hide();
        this.snackBar.openSnackBar("X??? L?? Y??u C???u Th??nh C??ng", "????ng");
        this.router.navigate(['appraiser-request-manage']);
      }))
    }
  }
}
