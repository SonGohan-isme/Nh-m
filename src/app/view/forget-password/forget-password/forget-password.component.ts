import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmployeeInfoDTO } from 'src/app/model/EmployeeInfoDTO';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { ServerHttpService } from 'src/app/services/http/server-http.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private spinner:NgxSpinnerService,private snackBar:SnackbarService,private httpService:ServerHttpService) { }

  ngOnInit(): void {
  }

  onSubmit(forgetPass:NgForm){
    this.spinner.show();
    this.httpService.sendMailResetPassWord({email:forgetPass.value.email}).subscribe((data => {
      if(data){
        this.snackBar.openSnackBar("Vui Lòng Kiểm Tra Lại Email "+forgetPass.value.email+" Để Xác Nhận Thay Đổi Mật Khẩu","Đóng");
        forgetPass.reset();
        this.spinner.hide();
      }else {
        this.snackBar.openSnackBar("Địa Chỉ Email Không Có Trong Hệ Thống","Đóng");
        this.spinner.hide();
        return;
      }
    }))
  }

}
