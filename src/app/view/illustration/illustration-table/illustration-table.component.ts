import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomerOwnIllustration } from 'src/app/model/CustomerOwnIllustration';
import { IllustrationService } from 'src/app/services/illustration/illustration.service';
import jwt_decode from 'jwt-decode';
import { CommonService } from 'src/app/services/common/common.service';
import { CustomerDetailDialogComponent } from '../../dialog/customer-detail-dialog/customer-detail-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-illustration-table',
  templateUrl: './illustration-table.component.html',
  styleUrls: ['./illustration-table.component.css']
})
export class IllustrationTableComponent implements OnInit {

  constructor(private dialog: MatDialog,private common:CommonService,private router : Router,private illustration:IllustrationService,private spinner:NgxSpinnerService,private illustrationService:IllustrationService) { }

  listCustomerOwnIllustration:Array<CustomerOwnIllustration>
  page: number = 1;
  totalRecords: number;
  searchValue: String = "";
  dateFrom: Date;
  dateTo: Date;

  ngOnInit(): void {
      this.illustrationService.subsVar = this.illustrationService.
      callRefreshTable.subscribe((name:string) => {  
        this.refresh();
      });
    this.refresh();
  }
  public refresh(){
    this.spinner.show();
    this.illustrationService.getAllCustomerOwnIllustration(jwt_decode(this.common.getCookie('token_key'))['sub']).subscribe((data => {
      this.listCustomerOwnIllustration = data;
      this.totalRecords = this.listCustomerOwnIllustration.length;
      this.spinner.hide();
    }))
  }

  
  public listIllustration(id:number){
    this.router.navigate(['list-illustration',id]);
  }

  Search() {
    this.spinner.show();
    try {
      let dateTo1: String;
      let dateFrom1: String;
      let dateToValue = (<HTMLInputElement>document.getElementById('RtoSearch')).value;
      let dateFromValue = (<HTMLInputElement>document.getElementById('RfromSearch')).value;
      if (dateFromValue == "") {      
        this.dateFrom = new Date('1990-01-01');
        dateFrom1 = this.dateFrom.getFullYear() + "-" + (this.dateFrom.getMonth() + 1) + "-" + this.dateFrom.getDate()
      } else {        
        dateFrom1 = this.dateFrom.toString();
      }
      if (dateToValue == "") {
        this.dateTo = new Date('5000-01-01');
        dateTo1 = this.dateTo.getFullYear() + "-" + (this.dateTo.getMonth() + 1) + "-" + this.dateTo.getDate()
      }
      else {
        dateTo1 = this.dateTo.toString();
      }
      let searchText = "%" + this.searchValue + "%";
      this.illustrationService.searchAllCustomerOwnIllustration(jwt_decode(this.common.getCookie('token_key'))['sub'],dateFrom1,dateTo1,searchText).subscribe((data => {
        this.listCustomerOwnIllustration = data;
        this.totalRecords = this.listCustomerOwnIllustration.length;
        this.spinner.hide();
        this.page=1;
      }))

    } catch (error) {
      console.log(error);
    }
  }

  ResetDate(){
   this.dateFrom = null;
   this.dateTo = null;
  }

    public openDialogCustomerDetail(id_customer:number){
      let dialogRef = this.dialog.open(CustomerDetailDialogComponent,{
        height:'80%',
        width:'fit-content',
        data:id_customer   
    });
  }
  key = '';
  reverse: boolean = true;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  }




