import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomerInfo } from 'src/app/model/CustomerInfo';
import { EmployeeAcc } from 'src/app/model/EmployeeAcc';
import { EmployeeInfoDTO } from 'src/app/model/EmployeeInfoDTO';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

@Component({
  selector: 'app-admin-add-account-employee',
  templateUrl: './admin-add-account-employee.component.html',
  styleUrls: ['./admin-add-account-employee.component.css']
})
export class AdminAddAccountEmployeeComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: EmployeeInfoDTO,private spinner:NgxSpinnerService,private employeeService:EmployeeService,private notiService: SnackbarService,) { }

  role:number;
  code_suppervisor:string;
 employeeAccList:Array<EmployeeAcc>;
  
  onSubmit(addAccEmployeeForm : NgForm,employeeInfo:EmployeeInfoDTO){
    this.spinner.show();
    let employeeAcc = new EmployeeAcc(addAccEmployeeForm.value.code,'',this.role,true);
    let emAccWithEmail = {email:this.data.email,emAcc:employeeAcc,code_suppervisor:this.code_suppervisor,id_custInfo:this.data.id};
    this.employeeService.addOneAccEmployee(emAccWithEmail).subscribe((dataid => {
      if(dataid != null){
        this.employeeService.getDetailEmployebyID(employeeInfo.id).subscribe((employeeInfoDTO =>{
          employeeInfoDTO.id_acc = dataid;
          employeeInfoDTO.dept_id=this.role;
        this.employeeService.UpdateEmployeeInfo(employeeInfoDTO).subscribe((data1 => {
          this.notiService.openSnackBar("Thêm Data Thành Công!",'Đóng');
          this.employeeService.invokeRefreshTableFun();
          this.spinner.hide();
        }));
        }))        
      } else {
        this.notiService.openSnackBar("Tài Khoản Nhân Viên Đã Tồn Tại!",'Đóng');
        this.spinner.hide();
      }
    }));

  }

  ngOnInit(): void {
    this.employeeService.getAllAccByIDRole({id:3,code_app_support:''}).subscribe((data => {
      // kiểm tra nếu role != 2 thì code_suppervisor là admin
      if(this.role!=2){
        this.code_suppervisor = "admin";
      }
      this.employeeAccList = data;
      this.code_suppervisor = this.employeeAccList[0].code;
    }))
  }

}
