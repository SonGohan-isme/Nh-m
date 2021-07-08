import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { forEach } from 'jszip';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmployeeAcc } from 'src/app/model/EmployeeAcc';
import { EmployeeInfoDTO } from 'src/app/model/EmployeeInfoDTO';
import { CommonService } from 'src/app/services/common/common.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { AdminPauseEmployeeDialogComponent } from 'src/app/view/dialog/admin-pause-employee-dialog/admin-pause-employee-dialog.component';
import { EmployeeEditInfoDialogComponent } from 'src/app/view/dialog/employee-edit-info-dialog/employee-edit-info-dialog.component';

@Component({
  selector: 'app-detail-em-table',
  templateUrl: './detail-em-table.component.html',
  styleUrls: ['./detail-em-table.component.css']
})
export class DetailEmTableComponent implements OnInit {

  statusAddInfoDialog: boolean = false;
  statusPasswordDialog: boolean = false;
  statusDeactiveAccDialog: boolean = false;
  listAcc: Array<EmployeeAcc>;
  showDelayButton: boolean = true;
  constructor(private common:CommonService,private spinner: NgxSpinnerService, private employeeService: EmployeeService, private activateRoute: ActivatedRoute, private dialog: MatDialog) { }
  employeinfoDTO: EmployeeInfoDTO;
  ngOnInit(): void {
    this.common.subsVar = this.common.    
      callRefreshTable.subscribe((name:string) => {    
        this.refresh();
      });   
    this.refresh();
  }

  public openDialogEdit() {
    let dialogRef = this.dialog.open(EmployeeEditInfoDialogComponent, { data: this.employeinfoDTO });

    dialogRef.afterClosed().subscribe(result => {

    })
  }

  public refresh(){
    this.common.titlePage = "Chi Tiết Nhân Viên";
    this.employeeService.getDetailEmployebyID(this.activateRoute.snapshot.params['id']).subscribe((data => {
      this.spinner.show();
      this.employeinfoDTO = data;
      if(this.employeinfoDTO.id_acc == null){
        this.showDelayButton = false;
        this.spinner.hide();
      }else{
        this.employeeService.getAllAcc().subscribe((data => {
          this.listAcc = data;
          if (this.listAcc.filter(x => x.id == this.employeinfoDTO.id_acc)[0].id_role == 3 || this.listAcc.filter(x => x.id == this.employeinfoDTO.id_acc)[0].id_role == 1 || this.listAcc.filter(x => x.id == this.employeinfoDTO.id_acc)[0].status == false) {
            this.showDelayButton = false;
            this.spinner.hide();
          }
          this.spinner.hide();
        }))
      }
    }))
  }

  public openDialogPauseEmployee(data:EmployeeInfoDTO) {
    let dialogRef = this.dialog.open(AdminPauseEmployeeDialogComponent, { data: data });
    dialogRef.afterClosed().subscribe(data => {
      this.common.invokeRefreshTableFun();
    })

  }
}
