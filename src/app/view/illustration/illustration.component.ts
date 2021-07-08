import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common/common.service';
import { AddCustomerIllustrationDialogComponent } from '../dialog/add-customer-illustration-dialog/add-customer-illustration-dialog.component';

@Component({
  selector: 'app-illustration',
  templateUrl: './illustration.component.html',
  styleUrls: ['./illustration.component.css']
})
export class IllustrationComponent implements OnInit {

  status: boolean = false;

  constructor(private common:CommonService,public dialog : MatDialog) { }

  ngOnInit(): void {
    this.common.titlePage="Danh Sách Chiến Dịch";
  }

  displayAddCustomerDialog(): void {
    this.status = !this.status;
  }
  
  public openDialog(){
    let dialogRef = this.dialog.open(AddCustomerIllustrationDialogComponent);
    
    dialogRef.afterClosed().subscribe(result => {
      
    })
  }


}
