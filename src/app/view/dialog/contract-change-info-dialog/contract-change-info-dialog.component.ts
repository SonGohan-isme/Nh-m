import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contract } from 'src/app/model/Contract';
import { ContractService } from 'src/app/services/contract/contract.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

@Component({
  selector: 'app-contract-change-info-dialog',
  templateUrl: './contract-change-info-dialog.component.html',
  styleUrls: ['./contract-change-info-dialog.component.css']
})
export class ContractChangeInfoDialogComponent implements OnInit {

  constructor(private contractService:ContractService,private snackbar : SnackbarService,@Inject(MAT_DIALOG_DATA) public contract:any) { }

  ngOnInit(): void {

  }

  public dateChanged(newDate:any){
    this.contract.end_time = new Date(newDate);
    
  }
 onSubmit(contractForm : NgForm){
  let contractinfo = new Contract(
    this.contract.id,
    contractForm.value.customerId,
    contractForm.value.contractOwnerName,
    contractForm.value.period,
    contractForm.value.insuranceType,
    contractForm.value.insuranceId,
    contractForm.value.illustrationId,
    contractForm.value.signDate,
    contractForm.value.outOfDate,
    contractForm.value.status,
    contractForm.value.approval_status,
    contractForm.value.totalPayment,
    contractForm.value.signDate
    );
      this.contractService.EditContract(contractinfo).subscribe((data => {     
        this.snackbar.openSnackBar('Cập Nhật Thành Công','Đóng'); 
      }))
  }
}
