import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contract } from 'src/app/model/Contract';
import { CustomerAttachment } from 'src/app/model/CustomerAttachment';
import { Referencetable } from 'src/app/model/Referencetable';
import { CommonService } from 'src/app/services/common/common.service';
import { FileManagementService } from 'src/app/services/fileManagement/file-management.service';
import { RefertableService } from 'src/app/services/refertable/refertable.service';

@Component({
  selector: 'app-contract-detail-dialog',
  templateUrl: './contract-detail-dialog.component.html',
  styleUrls: ['./contract-detail-dialog.component.css']
})
export class ContractDetailDialogComponent implements OnInit {

  constructor(private fileService:FileManagementService,@Inject(MAT_DIALOG_DATA) public contracts:Contract,private common:CommonService,
  public dialogRef: MatDialogRef<ContractDetailDialogComponent>,private referTable:RefertableService ) { }

  ref:Referencetable;
  payment_period:string;
  listDocument=new Array<CustomerAttachment>();
  ngOnInit(): void {
   
    switch(this.contracts.approval_status){
      case "CXD" : this.contracts.approval_status = "Chưa xét duyệt"; break;
      case "DXD" : this.contracts.approval_status = "Đang chờ xét duyệt"; break;
      case "DD" : this.contracts.approval_status = "Đã duyệt"; break;
      case "TC" : this.contracts.approval_status = "Từ chối"; break;
      case "YCT" : this.contracts.approval_status = "Yêu cầu thêm"; break;
    }

   


    if(this.common.getCookie('token_key')){
      this.referTable.getAllReference().subscribe((data => {
        this.ref=data;
        this.payment_period = this.ref.multiplierForPaymentPeriod.find(i => i.priod_id == this.contracts.payment_period_id)['description'];  
        this.fileService.getFileForCustomer(this.contracts.id).subscribe((data => {
          this.listDocument = data;
        }))   
      }))
    }else {
      this.referTable.getAllReferenceForCustomer(this.common.getCookie('token_customer')).subscribe((data => {
        this.ref=data;
        this.payment_period = this.ref.multiplierForPaymentPeriod.find(i => i.priod_id == this.contracts.payment_period_id)['description'];  
        this.fileService.getFileForCustomer(this.contracts.id).subscribe((data => {
          this.listDocument = data;
        }))  
      }))
    }
    
  }


}
