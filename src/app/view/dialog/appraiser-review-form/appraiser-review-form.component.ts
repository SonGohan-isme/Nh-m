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
        // set trạng thái cho hợp đồng và request
        let data1 = { id: this.req.id_contract, code: this.req.code_sender };
        this.contractService.getDetailContract(data1).subscribe((data => {
          // lấy tất cả thông tin của bảng minh họa
          this.illustSer.getIllustrationContractCreate(data['id_illustration']).subscribe((data => {
            this.illustration = data;
            let dataCommission = {
              payment_period_id: data['payment_period_id'],
              denomination: data['illustrationMainBenifit'].denominations
            }
            // lấy hệ số commisson để tính thu nhập cho nhân viên
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
              // doanh thu của 1 hợp đồng sẽ bằng tổng phí bảo hiểm đóng theo kỳ hạn
              this.revenue.revenue_val = this.illustration.total_fee;
              // gửi thông tin tài khoản và password cho khách hàng khi xét duyệt hợp đồng lần đầu tiên
              this.custService.sendOneAccCustomer((this.illustration.id_customer_info)).subscribe((data => {
                this.revenueSer.addOneRevenue(this.revenue).subscribe((data => {
                  this.spinner.hide();
                  this.snackBar.openSnackBar("Xử Lý Yêu Cầu Thành Công", "Đóng");
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
        this.snackBar.openSnackBar("Xử Lý Yêu Cầu Thành Công", "Đóng");
        this.router.navigate(['appraiser-request-manage']);
      }))
    }
  }
}
