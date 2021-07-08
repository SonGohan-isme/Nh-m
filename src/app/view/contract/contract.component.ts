import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common/common.service';
import { ContractAddDialogComponent } from '../dialog/contract-add-dialog/contract-add-dialog.component';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {

  status: boolean = false;

  constructor(private common:CommonService,public dialog:MatDialog) { }

  ngOnInit(): void {
    this.common.titlePage = "Danh Sách Hợp Đồng";
  }

  displayAddContractDialog(): void {
    this.status = !this.status;
  }

  public openDialog(){
    let dialogRef = this.dialog.open(ContractAddDialogComponent);
    
    dialogRef.afterClosed().subscribe(result => {
      
    })
  }
}
