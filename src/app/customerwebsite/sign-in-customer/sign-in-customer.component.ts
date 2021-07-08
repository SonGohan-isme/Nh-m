import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomerAcc } from 'src/app/model/CustomerAcc';
import { CommonService } from 'src/app/services/common/common.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

@Component({
  selector: 'app-sign-in-customer',
  templateUrl: './sign-in-customer.component.html',
  styleUrls: ['./sign-in-customer.component.css']
})
export class SignInCustomerComponent implements OnInit {

  constructor(private snackBar:SnackbarService,private spinner:NgxSpinnerService,private customerService:CustomerService,private common:CommonService,private router:Router) { }
  customerAcc = new CustomerAcc(0,"","",false);
  
  customerAccPass
  ngOnInit(): void {
    let token_customer = this.common.getCookie('token_customer');
    if(token_customer){
      this.router.navigate(['']);
    }else{
      return;
    }
  }
  onSubmit(){
    this.spinner.show();
    this.customerService.authenAccCustomer(this.customerAcc).subscribe((data =>{
      if(data['token_customer']){
        this.common.setCookie('token_customer',data['token_customer'],1);
        this.common.setCookie('name_customer',this.customerAcc.code,1);
        this.router.navigate(['']);
        this.spinner.hide();
      } else {
        this.snackBar.openSnackBar("Vui lòng xem lại tài khoản và mật khẩu","Đóng");
        this.spinner.hide();
      }
    }))
  }
}
