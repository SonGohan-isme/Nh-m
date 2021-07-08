import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { AdminAddEmployeeInfoComponent } from '../dialog/admin-add-employee-info/admin-add-employee-info.component';
import { EmployeeInfoDTO } from 'src/app/model/EmployeeInfoDTO';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-admin-employee-manage',
  templateUrl: './admin-employee-manage.component.html',
  styleUrls: ['./admin-employee-manage.component.css']
})
export class AdminEmployeeManageComponent implements OnInit {

  pageTitle: string = "Danh Sách Nhân Viên";
  addEmployeeBtn: string = "Thêm Nhân Viên";
  status: boolean = false;
  namesearch:String;

  constructor(private common:CommonService,private employeeService : EmployeeService,private dialog :MatDialog ) 
  {}

  ngOnInit(): void {
    this.common.titlePage = "Danh Sách Nhân Viên"
  }

  displayAddEmployeeDialog() {
    this.status = !this.status;
  }
  
  employeeinfo = new EmployeeInfoDTO(0,'','',new Date(),0,'','','','',new Date(),new Date(),false,null,1,1,1,1,1,false,'','','','','','','','','','','','','','','','',false);
public openDialog(){
  let dialogRef = this.dialog.open(AdminAddEmployeeInfoComponent,{
    height:'80%',
    width:'60%',
    data : this.employeeinfo
  });
  
  dialogRef.afterClosed().subscribe(result => {
    
  })
}

}
