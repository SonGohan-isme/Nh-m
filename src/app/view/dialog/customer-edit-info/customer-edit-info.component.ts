import { Component, OnInit,Inject } from '@angular/core';
import { inject } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/services/common/common.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
@Component({
  selector: 'app-customer-edit-info',
  templateUrl: './customer-edit-info.component.html',
  styleUrls: ['./customer-edit-info.component.css']
})

export class CustomerEditInfoComponent implements OnInit {
  constructor(private spinner:NgxSpinnerService,private common:CommonService,public dialogRef: MatDialogRef<CustomerEditInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public customerInfo:any,private customerService:CustomerService,private snackbar: SnackbarService) { }
  selectedDeal:Date;

  genders= Array[2] = [
    {value: 1, viewValue: 'Nam'},
    {value: 0, viewValue: 'Nữ'},
  ];

  marital_statuss = Array[2] = [
    {value: 1, viewValue: 'Đã Kết Hôn'},
    {value: 0, viewValue: 'Chưa Kết Hôn'},
  ];

  occupation_groups = Array[3] = [
    { value: 1, viewValue: '1' },
    { value: 2, viewValue: '2' },
    { value: 3, viewValue: '3' },
  ];

  public dateChanged(newDate:any){
    this.customerInfo.birth_date = new Date(newDate);
    
  }

  caculateAge(date:any){
    this.customerInfo.age =this.common.calculateAge(new Date(date));
  }

  ngOnInit(): void {
    this.customerInfo.birth_date = new Date(this.customerInfo.birth_date).getFullYear() +"-"+ (new Date(this.customerInfo.birth_date).getMonth() < 10 ? "0"+(new Date(this.customerInfo.birth_date).getMonth()+1):new Date(this.customerInfo.birth_date).getMonth()+1 )+"-"+ (new Date(this.customerInfo.birth_date).getDate() < 10 ? "0"+(new Date(this.customerInfo.birth_date).getDate()):new Date(this.customerInfo.birth_date).getDate() );
  }

  public updateInfoCustomer(){
    this.spinner.show();
    this.customerService.updateCustomerInfo(this.customerInfo).subscribe(( data => {
      if(data){
        this.common.invokeRefreshTableFun();
        this.snackbar.openSnackBar('Cập Nhật Thành Công','Đóng');
        this.dialogRef.close();
      } else {
        this.snackbar.openSnackBar('Email hoặc CMT Đã Được Sử Dụng','Đóng');
      }
      this.spinner.hide();
    }))
  }

}
