import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonService } from 'src/app/services/common/common.service';
import { ServerHttpService } from 'src/app/services/http/server-http.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { EmployeeAcc } from 'src/app/model/EmployeeAcc';
import jwtDecode from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { CustomerAcc } from 'src/app/model/CustomerAcc';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-pass-customer',
  templateUrl: './change-pass-customer.component.html',
  styleUrls: ['./change-pass-customer.component.css']
})
export class ChangePassCustomerComponent implements OnInit {

  constructor(private custService:CustomerService,private snackBar:SnackbarService,private spinner:NgxSpinnerService,
    private common:CommonService,private route:Router) { }

  ngOnInit(): void {
    if(this.common.getCookie('token_customer')){
      return;
    } else {
      this.route.navigate(['']);
    }
  }

  onSubmit(changePassForm:NgForm){
    this.spinner.show();
    if(changePassForm.value.newPass == changePassForm.value.confirmNewPass){
      let data = {'old_pass':changePassForm.value.oldPass,'new_pass':changePassForm.value.newPass,id_customer_info:jwtDecode(this.common.getCookie('token_customer'))['sub']}
      this.custService.changePassCustomer(data).subscribe((data => {
        if(data){
          this.snackBar.openSnackBar('Đổi Mật Khẩu Thành Công','Đóng');
          changePassForm.reset();
        }else{
          this.snackBar.openSnackBar('Mật Khẩu Cũ Không Đúng','Đóng');
        }
        this.spinner.hide();
        return;
      }))
    } else {
      this.snackBar.openSnackBar('Mật Khẩu Mới Không Khớp','Đóng');
      this.spinner.hide();
      return;
    }
  }

}
