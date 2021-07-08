import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EmployeeInfoDTO } from 'src/app/model/EmployeeInfoDTO';
import { CommonService } from 'src/app/services/common/common.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

@Component({
  selector: 'app-admin-add-employee-info',
  templateUrl: './admin-add-employee-info.component.html',
  styleUrls: ['./admin-add-employee-info.component.css']
})
export class AdminAddEmployeeInfoComponent implements OnInit {

  constructor(public employeeService: EmployeeService,
    @Inject(MAT_DIALOG_DATA) public employeinfoDTO: EmployeeInfoDTO, private common: CommonService, private router: Router, private notiService: SnackbarService) { }

  ngOnInit(): void {

  }

  genders = Array[2] = [
    { value: 'true', viewValue: 'Nam' },
    { value: 'false', viewValue: 'Nữ' },
  ];

  marital_statuss = Array[2] = [
    { value: 'true', viewValue: 'Đã Kết Hôn' },
    { value: 'false', viewValue: 'Chưa Kết Hôn' },
  ];

  public dateChanged(newDate: any) {
    this.employeinfoDTO.date_of_birth = new Date(newDate);
  }

  public onSubmit() {
    this.employeeService.addEmployeeInfo(this.employeinfoDTO).subscribe((data => {
      if(data !=null){
        this.employeeService.invokeRefreshTableFun();  
        this.notiService.openSnackBar("Thêm thông tin nhân viên thành công","Đóng"); 
      }else{
        this.employeeService.invokeRefreshTableFun();  
        this.notiService.openSnackBar("Thêm thông tin nhân viên KHÔNG thành công","Đóng"); 
      }    
    }))

  }

  ageCheck: number;
  checkAge: boolean;
  
  caculateAge(date:any){
    this.employeinfoDTO.date_of_birth = new Date(date);
    this.employeinfoDTO.age =this.common.calculateAge(new Date(date));
  }

}
