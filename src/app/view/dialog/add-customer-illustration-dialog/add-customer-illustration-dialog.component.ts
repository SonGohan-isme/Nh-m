import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import jwt_decode from "jwt-decode";
import { map, startWith } from 'rxjs/operators';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { CommonService } from 'src/app/services/common/common.service';
import { IllustrationService } from 'src/app/services/illustration/illustration.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { CustomerAcc } from 'src/app/model/CustomerAcc';
import { CustomerOwnIllustration } from 'src/app/model/CustomerOwnIllustration';
import { NgxSpinnerService } from 'ngx-spinner';
import moment from 'moment';

@Component({
  selector: 'app-add-customer-illustration-dialog',
  templateUrl: './add-customer-illustration-dialog.component.html',
  styleUrls: ['./add-customer-illustration-dialog.component.css']
})
export class AddCustomerIllustrationDialogComponent implements OnInit {

  constructor(
    private spinner:NgxSpinnerService,
    private illustrationService:IllustrationService,private snackBar: SnackbarService,
    private customerOwnIllustration:IllustrationService,private common:CommonService,
    private customerService:CustomerService) { }

  private _filter(value: string): string[] {
    const filterValue = value?.toLowerCase();

    return this.options.filter(option => option?.toLowerCase().includes(filterValue));
  }

  check=false;
  listCust:Array<CustomerAcc>;
  myControl = new FormControl();
  codeValue='';
  end_time=  new Date();
  options= new Array();
  filteredOptions: Observable<string[]>;
  listCustomerOwnIllustration:Array<CustomerOwnIllustration>;

  ngOnInit(): void {
    this.customerService.getAllCustomerInfo(jwt_decode(this.common.getCookie('token_key'))['sub']).subscribe((data => {
      var list = new Array();
      data.filter(function(el){
        list.push(el.code);
      });
      this.options = list;
    }))
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  onSubmit(){
    this.customerService.getAllCustomerInfo(jwt_decode(this.common.getCookie('token_key'))['sub']).subscribe((data1 => {
      this.listCust = data1;
      //xét xem tên nhập vào có phải là nhân viên của mình hay không?
      for(let item of this.listCust)
      {
        if(item.code == this.codeValue){
          this.check = true;
          break;
        }
      }
      if(!this.check){
        this.snackBar.openSnackBar('Bạn Không Có Khách Hàng Này! ','Đóng');
        return;
      }
      // xét xem người này đã có chiên dịch hay chưa
      this.spinner.hide();
      this.illustrationService.getAllCustomerOwnIllustration(jwt_decode(this.common.getCookie('token_key'))['sub']).subscribe((data => {
        this.listCustomerOwnIllustration = data;
        var checkDup = false;
      for(let el of this.listCustomerOwnIllustration){
        if(el['code'] == this.codeValue){
          checkDup = true;
          break;
        }
      }
      if(!checkDup){
        if((new Date(this.end_time)).setHours(0,0,0,0) <= (new Date()).setHours(0,0,0,0)){
          this.snackBar.openSnackBar('Ngày Kết Thúc Chiến Dịch Là Ngày Tương Lai','Đóng');
          return;
        }
        this.customerOwnIllustration.addOneCustomerOwnIllustration(this.codeValue,this.end_time).subscribe((data => {
          this.customerOwnIllustration.invokeRefreshTableFun();
        }))
      } else {
        this.snackBar.openSnackBar('Khách Hàng Đã Có Danh Sách Bảng Minh Họa','Đóng');
      }
        this.spinner.hide();
      }))
      
    }))
    
  }

}
