import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SigInData } from 'src/app/model/SigInData';
import { CommonService } from '../common/common.service';
import { EmployeeService } from '../employee/employee.service';
import { ServerHttpService } from '../http/server-http.service';
import { SnackbarService } from '../snackbar/snackbar.service';
import jwt_decode from 'jwt-decode';
import { EmployeeInfoDTO } from 'src/app/model/EmployeeInfoDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {
  id_role = "";
  isAuthen = false;
  empolyeeInfo: EmployeeInfoDTO;

  constructor(private spinner: NgxSpinnerService, public snackBar: SnackbarService, private router: Router,
    private serverhttpService: ServerHttpService, private employee: EmployeeService, private common: CommonService) { }

  authenticate(sigIndata: SigInData) {
    if (sigIndata.getCode() == '' || sigIndata.getPass() == '') {
      this.snackBar.openSnackBar("Vui Lòng Xem Lại Tài Khoản Và Mật Khẩu", 'ĐÓNG');
      return;
    } else {
      try {
        this.spinner.show();
        this.serverhttpService.getAcc(sigIndata.getCode(), sigIndata.getPass()).subscribe((data1 => {
          this.isAuthen = true;
          this.common.setCookie('token_key', data1['token_key'], 3);
          if (data1['status_code'] !== 'not ok') {
            this.employee.getDetailEmployebyCode(jwt_decode(data1['token_key'])['sub']).subscribe((data => {
              this.empolyeeInfo = data;
              this.employee.getAccByCode(this.common.getCookie('token_key')).subscribe((data => {
                this.id_role = data['id_role'];
                if (this.id_role == '2') {
                  this.spinner.hide();
                  this.router.navigate(['dashboard']);
                } else if (this.id_role == '1') {
                  this.spinner.hide();
                  this.router.navigate(['employee-manage']);
                } else if (this.id_role == '3') {
                  this.spinner.hide();
                  this.router.navigate(['appraiser-request-manage']);
                } else if (this.id_role == '4') {
                  this.spinner.hide();
                  this.router.navigate(['claim-request-manage']);
                } else if (this.id_role == '5') {
                  this.spinner.hide();
                  this.router.navigate(['dashboard']);
                } else if (this.id_role == '6') {
                  this.spinner.hide();
                  this.router.navigate(['dashboard']);
                }

              }));
            }))

          } else {
            this.snackBar.openSnackBar("Vui Lòng Xem Lại Tài Khoản Và Mật Khẩu", 'ĐÓNG');
            this.isAuthen = false;
            this.spinner.hide();
          }
        }));
      } catch (error) {
        this.snackBar.openSnackBar("Vui Lòng Xem Lại Tài Khoản Và Mật Khẩu", 'ĐÓNG');
      };

    }
    return false;
  }


}
