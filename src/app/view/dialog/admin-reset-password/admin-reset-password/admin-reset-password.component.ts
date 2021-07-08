import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

@Component({
  selector: 'app-admin-reset-password',
  templateUrl: './admin-reset-password.component.html',
  styleUrls: ['./admin-reset-password.component.css']
})
export class AdminResetPasswordComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private snackbar:SnackbarService,private emSer:EmployeeService,
  private custSer:CustomerService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
  }
  onSubmit(){
    this.spinner.show();
    if(this.data.code_ap_support){
      this.emSer.resetPassEmployee(this.data).subscribe(( data => {
        this.snackbar.openSnackBar("Đặt Lại Mật Khẩu Cho Nhân Viên "+this.data.code+" Thành Công !","Đóng");
        this.spinner.hide();
      }))
    } else {
      this.custSer.resetPassCustomer(this.data).subscribe((data => {
        this.snackbar.openSnackBar("Đặt Lại Mật Khẩu Cho Khách Hàng "+this.data.code+" Thành Công !","Đóng");
        this.spinner.hide();
      }))
    }
  }

}
