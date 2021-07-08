import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/services/common/common.service';
import { ServerHttpService } from 'src/app/services/http/server-http.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

@Component({
  selector: 'app-confirm-change-pass',
  templateUrl: './confirm-change-pass.component.html',
  styleUrls: ['./confirm-change-pass.component.css']
})
export class ConfirmChangePassComponent implements OnInit {

  constructor(private spinner:NgxSpinnerService,private route:Router,private activeRoute:ActivatedRoute,private httpService:ServerHttpService,private snackbar:SnackbarService) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    let password = form.value.pass.trim();
    let confirmPassword = form.value.confirmPass.trim();

    if(password !== confirmPassword || password == '' || confirmPassword == ''){
      this.snackbar.openSnackBar('Mật khẩu không khớp','Đóng')
      return;
    } else {
      this.activeRoute.queryParams.subscribe((params => {
        let dataChangePass = {"password":form.value.pass.trim(),"token_key":params['active_key']};
        this.spinner.show();
        this.httpService.changePassword(dataChangePass).subscribe((data => {
          if(data){
            this.spinner.hide();
            this.snackbar.openSnackBar('Đổi Mật Khẩu Thành Công!','Đóng');
            this.route.navigate(['/login']);
          } else {
            this.spinner.hide();
            this.snackbar.openSnackBar('Đổi Mật Khẩu KHÔNG Thành Công!','Đóng');
          }
          
        }));
      }))
      
    }
  }

}
