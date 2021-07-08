import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Illustration } from 'src/app/model/Illustration';
import { CommonService } from 'src/app/services/common/common.service';
import { IllustrationService } from 'src/app/services/illustration/illustration.service';

@Component({
  selector: 'app-list-illustration',
  templateUrl: './list-illustration.component.html',
  styleUrls: ['./list-illustration.component.css']
})
export class ListIllustrationComponent implements OnInit {

  constructor(private common:CommonService,private spinner: NgxSpinnerService,private router:Router,private illustrationService : IllustrationService,private activateRoute:ActivatedRoute) { }
  page=1;
  totalRecords:number;
illustrations : Array<Illustration>;
  ngOnInit(): void {
    this.common.titlePage = "Danh Sách Bản Minh Họa";
    this.illustrationService.subsVar = this.illustrationService.
      callRefreshTable.subscribe((name:string) => {  
        this.refresh();
      });
    this.refresh();     
  }
  key = '';
  reverse: boolean = true;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  public refresh(){
    this.spinner.show();
    this.illustrationService.getAllIllustrationBelongCustomer(this.activateRoute.snapshot.params['id']).subscribe((data =>{
      this.illustrations = data;
      this.totalRecords = data.length;
      this.spinner.hide();
    }))
  }
  

  addIllustration(){
    this.router.navigate(['create-illustration'],{ queryParams: { id: this.activateRoute.snapshot.params['id'] } });
  }

  public illustrationDetail(id:number){
    this.router.navigate(['detail-illustration',id]);
  }

  searchValue: String = "";
  dateFrom: Date;
  dateTo: Date;
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
      this.illustrationService.searchAllIllustrationBelongCustomer(this.activateRoute.snapshot.params['id'],dateFrom1,dateTo1,searchText).subscribe((data =>{
        this.illustrations = data;
        this.totalRecords = data.length;
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



}
