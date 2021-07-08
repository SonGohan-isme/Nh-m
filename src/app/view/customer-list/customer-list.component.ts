import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomerInfo } from 'src/app/model/CustomerInfo';
import { CommonService } from 'src/app/services/common/common.service';
import { CustomerAddInfoDialogComponent } from '../dialog/customer-add-info-dialog/customer-add-info-dialog.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {

  status: boolean = false;
  
  

  customerInfo = new CustomerInfo(0,new Date(),0,'','','','','','','','','','','','','','',0,0,0,0,'','','',0,'','','','','','','','','','','','','','','','','','',0,'',0,0,'',new Date(),0,new Date(),'',0);

  constructor(private common:CommonService,public dialog : MatDialog) { }
  
  ngOnInit(): void {
    this.common.titlePage = "Danh Sách Khách Hàng";
  }

  displayAddCustomerDialog(): void {
    this.status = !this.status;
  }

  public openDialog(){
    let dialogRef = this.dialog.open(CustomerAddInfoDialogComponent,{
      height:'80%',
      width:'fit-content',
      data:this.customerInfo
    });
    
    dialogRef.afterClosed().subscribe(result => {
    })
  }
}
