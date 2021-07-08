import { Route, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MailService } from 'src/app/services/mail/mail.service';
import { CommonService } from 'src/app/services/common/common.service';
import { AddMailDialogComponent } from '../dialog/add-mail-dialog/add-mail-dialog.component';
import { ServerHttpService } from 'src/app/services/http/server-http.service';
import { Mail } from 'src/app/model/Mail';
import jwtDecode from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})

export class MailComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService,private mailService: MailService,private confirmMail:ServerHttpService ,public dialog: MatDialog, private router: Router, private common: CommonService) { }

  emailReceiveList : Array<Mail>;
  emailSentList : Array<Mail>;
  ngOnInit(): void {
    this.common.titlePage = "Hộp Thư";
    this.common.subsVar = this.common.    
      callRefreshTable.subscribe((name:string) => {    
        this.refresh();
      });   
    this.refresh();

  }

  data: Array<Mail>;
  pagesReceive: number = 1;
  pagesSent: number = 1;
  totalRecordReceive: number;
  totalRecordSent: number;
  mailId: number;

  mail = new Mail(0,'','',new Date(),'','','',0,0,'');

  detailMail(mail_id: number): void {
    this.mailService.setMailId(mail_id);
  }

  displayDialog(): void {
    let dialogRef = this.dialog.open(AddMailDialogComponent, {
      width:'50%',
      data : this.mail
    });
  }

  searchValueReceive: String = "";
  dateFromReceive: Date;
  dateToReceive: Date;
  
  SearchReceive() {
    this.spinner.show();
    try {
      let dateTo1: String;
      let dateFrom1: String;
      let dateToValue = (<HTMLInputElement>document.getElementById('RtoSearchReceive')).value;
      let dateFromValue = (<HTMLInputElement>document.getElementById('RfromSearchReceive')).value;
      if (dateFromValue == "") {
        this.dateFromReceive = new Date('1990-01-01');
        dateFrom1 = this.dateFromReceive.getFullYear() + "-" + (this.dateFromReceive.getMonth() + 1) + "-" + this.dateFromReceive.getDate()
      } else {
        dateFrom1 = this.dateFromReceive.toString();
      }

      if (dateToValue == "") {
        this.dateToReceive = new Date('3000-01-01');
        dateTo1 = this.dateToReceive.getFullYear() + "-" + (this.dateToReceive.getMonth() + 1) + "-" + this.dateToReceive.getDate()
      }
      else {
        dateTo1 = this.dateToReceive.toString();
      }
      let searchText = "%" + this.searchValueReceive + "%";
      this.mailService.searchAllMailReceive(jwtDecode(this.common.getCookie('token_key'))['sub'],dateFrom1,dateTo1,searchText).subscribe((data => {
        this.emailReceiveList = data;
        this.totalRecordReceive = data.length;
        this.spinner.hide();
        this.pagesReceive=1;
      }));

    } catch (error) {
      console.log(error);
    }
  }

  ResetDateReceive() {
    this.dateFromReceive = null;
    this.dateToReceive = null;
  }

  public mailDetail(id: number) {
    this.router.navigate(['view_detail_mail',id]);
    
  }


  searchValueSent: String = "";
  dateFromSent: Date;
  dateToSent: Date;
  SearchSent() {
    this.spinner.show();
    try {
      let dateTo1: String;
      let dateFrom1: String;
      let dateToValue = (<HTMLInputElement>document.getElementById('RtoSearchSent')).value;
      let dateFromValue = (<HTMLInputElement>document.getElementById('RfromSearchSent')).value;
      if (dateFromValue == "") {
        this.dateFromSent = new Date('1990-01-01');
        dateFrom1 = this.dateFromSent.getFullYear() + "-" + (this.dateFromSent.getMonth() + 1) + "-" + this.dateFromSent.getDate()
      } else {
        dateFrom1 = this.dateFromSent.toString();
      }

      if (dateToValue == "") {
        this.dateToSent = new Date('3000-01-01');
        dateTo1 = this.dateToSent.getFullYear() + "-" + (this.dateToSent.getMonth() + 1) + "-" + this.dateToSent.getDate()
      }
      else {
        dateTo1 = this.dateToSent.toString();
      }
      let searchText = "%" + this.searchValueSent + "%";
      this.mailService.searchAllMailSent(jwtDecode(this.common.getCookie('token_key'))['sub'],dateFrom1,dateTo1,searchText).subscribe((data => {
        this.emailSentList = data;
        this.totalRecordSent = data.length;
        this.spinner.hide();
        this.pagesSent = 1;
      }));

    } catch (error) {
      console.log(error);
    }
  }

  ResetDateSent() {
    this.dateFromSent = null;
    this.dateToSent = null;
  }

  refresh(){
    this.mailService.getAllMail(jwtDecode(this.common.getCookie('token_key'))['sub']).subscribe((data => {
      this.emailReceiveList = data;
      this.totalRecordReceive = data.length;
    }));
    this.mailService.getAllMailSent(jwtDecode(this.common.getCookie('token_key'))['sub']).subscribe((data => {
      this.emailSentList = data;
      this.totalRecordSent = data.length;
    }));
  }



  key = 'id';
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
}
