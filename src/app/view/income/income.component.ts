import { Component, OnInit } from '@angular/core';
import { Revenue } from 'src/app/model/Revenue';
import { CommonService } from 'src/app/services/common/common.service';
import { RevenueService } from 'src/app/services/revenue/revenue.service';
import jwt_decode from "jwt-decode";
import { ContractService } from 'src/app/services/contract/contract.service';
import { Router } from '@angular/router';
import { Income } from 'src/app/model/Income';
import { element } from 'protractor';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {

  constructor(private router:Router,private revenueService:RevenueService,private common : CommonService,private contractService: ContractService) { }
listMoneyCurrent = Array<itemIncomePredic>();// danh sách hiển thị các thu nhập đã nhận
listMoneyFuture = Array<itemIncomePredic>();// danh sách hiển thị các thu nhập sắp tới sẽ nhận
// danh sách này để hiển thị
listIncomePredic = Array<itemIncomePredic>();
// danh sách thu nhập trong năm nay bao gồm các thu nhập dự đoán trước, danh sách này lấy từ API
listIncome : Array<Income> = [];
listRevenueEmployee : Array<Revenue> = [];
listRevenueEmployeeMonthBefore : Array<Revenue> = [];
listRevenueEmployeeYearBefore : Array<Revenue> = [];
listRevenueEmployeeYearBeforeBig: Array<any> = [];
monthRevenueList : Array<number> = [];
RevenueLastMonth : number = 0;
ContractCount : number = 0;
dateNow:Date = new Date(); 
month:number = this.dateNow.getMonth()+1;
year:number = this.dateNow.getFullYear();
page: number = 1;
totalRecords: number;



  ngOnInit(): void {
    this.common.titlePage = "Theo Dõi Doanh Thu";
    this.revenueService.getAllRevenue(jwt_decode(this.common.getCookie('token_key'))['sub']).subscribe((data =>{
      this.listRevenueEmployee = data;
      this.totalRecords = this.listRevenueEmployee.length;
    }))



    
    
    for(let i=0;i<12;i++){
      let incomePredic = new itemIncomePredic(i+1,0,0);
      this.listIncomePredic.push(incomePredic);
    }
    this.revenueService.getAllIncomeSaler(jwt_decode(this.common.getCookie('token_key'))['sub']).subscribe((data => {
      this.listIncome = data;
      this.listIncome.forEach(item => {
        //Bước 1: cộng income vào tháng mà hợp đồng này bắt đầu hoạt động
      var startTime = new Date(item.start_time);
      if(startTime.getFullYear() == this.year){
        this.listIncomePredic[startTime.getMonth()].income += item.income;
        this.listIncomePredic[startTime.getMonth()].revenue += item.revenue_val;
      }

        //Bước 2: Tính Income cho các tháng tiếp theo trong năm đó
        var startTime = new Date(item.start_time);// tháng mà khach hàng bắt đầu ký hợp đồng và trao tiền
        var desTime = this.addMonths(new Date(item.start_time),12); // thời gian 1 năm đầu tiên của hợp đồng tính từ ngày đầu tiên
        var nextTime = this.addMonths(new Date(item.start_time),this.transformPeriod(item.description));
        while(true){
          if(nextTime.getFullYear() > this.year) break;
          else if(nextTime.getFullYear() == this.year){
            this.listIncomePredic.forEach(element => {
              if(element.month == (nextTime.getMonth() + 1)){
                if(nextTime > startTime && nextTime <= desTime){ // nếu là các năm tiếp theo thì income giảm 5 lần còn trong năm đầu tiên thì giữ nguyên income
                  
                  element.income += item.income;
                } else {
                  element.income += item.income / 5;
                }
                  element.revenue += item.revenue_val;
              }
            })
          }
          nextTime = this.addMonths(new Date(nextTime),this.transformPeriod(item.description));
        }
      })
      // chia rõ ràng 2 phần : phần 1 bao gồm các tháng doanh thu đã nhận, phần 2 bao gồm các doanh thu dự kiến
      this.listIncomePredic.forEach(item => {
        if(item.month < this.month){
          this.listMoneyCurrent.push(item);
        } else {
          this.listMoneyFuture.push(item);
        }
      })
    }))

  }
  public IncomeDetailLastYear(month:number){
    this.router.navigate(['employee-detail-income',month]);
  }


  addMonths(date:Date, months:number) {
    var d = date.getDate();
    date.setMonth(date.getMonth() + +months);
    if (date.getDate() != d) {
      date.setDate(0);
    }
    return date;
  }

  transformPeriod(data:any){
    switch(data){
      case ("Năm"):{
        return 12;
      } case("Nửa Năm"):{
        return 6;
      } case("Quý"):{
        return 3;
      } case("Tháng"):{
        return 1;
      }
    }
  }
}

class itemIncomePredic{
  month:number;
  income:number;
  revenue:number;

  constructor(
    month:number,
  income:number,
  revenue:number
  ){
    this.month = month;
    this.income = income;
    this.revenue = revenue;
  }
  
  
}


