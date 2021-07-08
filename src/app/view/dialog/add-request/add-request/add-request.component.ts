import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contract } from 'src/app/model/Contract';
import jwt_decode from 'jwt-decode';
import { EmployeeAcc } from 'src/app/model/EmployeeAcc';
import { Request } from 'src/app/model/Request';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { CommonService } from 'src/app/services/common/common.service';
import { ContractrequestService } from 'src/app/services/contractRequest/contractrequest.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { ContractService } from 'src/app/services/contract/contract.service';
import { EmployeeInfoDTO } from 'src/app/model/EmployeeInfoDTO';

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.css']
})
export class AddRequestComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public contract: Contract,private contractService:ContractService,private snackBar:SnackbarService,private spinner:NgxSpinnerService,private reqService:ContractrequestService,private common:CommonService,private EmAccService:EmployeeService) { }

  req=new Request(0,'',0,new Date(),0,'','','','high',0,'');
  EmAcc:EmployeeInfoDTO;
  ngOnInit(): void {
    this.EmAccService.getDetailEmployebyCode(jwt_decode(this.common.getCookie('token_key'))['sub']).subscribe((data => {
      this.EmAcc = data;
    }))
  }

  sendReq(){
    this.req.id_type = 1;
    this.req.requestcol = 1;
    this.req.code_sender =  jwt_decode(this.common.getCookie('token_key'))['sub'];
    this.req.id_contract = this.contract.id;
    this.req.status = 'CXD';
    this.req.code_reciever = this.EmAcc.code_ap_support;

    this.reqService.addOneRequest(this.req).subscribe((data => {
      this.contractService.setStatusContract(this.contract.id,-1,'','DXD').subscribe((data => {
        this.snackBar.openSnackBar("Gửi Yêu Cầu Thành Công","Đóng");
        this.contractService.invokeRefreshTableFun();
      }))
    }))

    
  }

}