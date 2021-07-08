import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Illustration } from 'src/app/model/Illustration';
import { CommonService } from 'src/app/services/common/common.service';
import { IllustrationService } from 'src/app/services/illustration/illustration.service';
import jwtDecode from 'jwt-decode';
import { MatDialog } from '@angular/material/dialog';
import { CustomerDetailDialogComponent } from 'src/app/view/dialog/customer-detail-dialog/customer-detail-dialog.component';
import { IllustrationDetailDialogComponent } from 'src/app/view/dialog/illustration-detail-dialog/illustration-detail-dialog.component';

@Component({
  selector: 'app-list-illustration-customer',
  templateUrl: './list-illustration-customer.component.html',
  styleUrls: ['./list-illustration-customer.component.css']
})
export class ListIllustrationCustomerComponent implements OnInit {

  constructor(private common:CommonService,private dialog:MatDialog,
    private spinner: NgxSpinnerService,private router:Router,private illustrationService : IllustrationService,private activateRoute:ActivatedRoute) { }

  page=1;
  totalRecords:number;
  illustrations : Array<Illustration>;
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
    this.illustrationService.getAllIllustrationForCustomer(jwtDecode(this.common.getCookie('token_customer'))['sub']).subscribe((data =>{
      this.illustrations = data;
      this.totalRecords = data.length;
      this.spinner.hide();
    }))
  }

  viewDetail(id_illust:number){
    this.dialog.open(IllustrationDetailDialogComponent,{
      height:'80%',
      data:id_illust
    })
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
        this.dateTo = new Date('3000-01-01');
        dateTo1 = this.dateTo.getFullYear() + "-" + (this.dateTo.getMonth() + 1) + "-" + this.dateTo.getDate()
      }
      else {
        dateTo1 = this.dateTo.toString();
      }
      let searchText = "%" + this.searchValue + "%";
      // this.illustrationService.searchAllIllustrationBelongCustomer(this.activateRoute.snapshot.params['id'],dateFrom1,dateTo1,searchText).subscribe((data =>{
      //   this.illustrations = data;
      //   console.log( this.illustrations);
      //   this.totalRecords = data.length;
      //   this.spinner.hide();
      //   this.page=1;
      // }))
      this.illustrationService.searchAllIllustrationForCustomer(jwtDecode(this.common.getCookie('token_customer'))['sub'],dateFrom1,dateTo1,searchText).subscribe((data =>{
        this.illustrations = data;
        this.totalRecords = data.length;
        this.page=1;
        this.spinner.hide();
      }))

    } catch (error) {
      console.log(error);
    }
  }

  ResetDate(){
    this.dateFrom = null;
    this.dateTo = null;
  }
}
