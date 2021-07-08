import { Component ,ViewChild, OnInit} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthenService } from './services/authen/authen.service';
import { CommonService } from './services/common/common.service';
import jwt_decode from 'jwt-decode';
import { EmployeeService } from './services/employee/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ISSYSTEM';
  @ViewChild('sidenav') sidenav: MatSidenav;
  public isOpened = false;

  constructor(public authenService: AuthenService, public common:CommonService,private employeeSer:EmployeeService,
    public router: Router){
    
    var url =window.location.href;
    if(this.common.getCookie("token_key") === ''){
      this.authenService.isAuthen=false;
      if (!this.authenService.isAuthen && url.includes('confirm-change-pass') && !url.includes('active_key')){
        this.router.navigate(['login']);
        return;
      }
    }
    else {
      // nếu token_key vẫn tồn tại và url chứa các ký tự của trang khách hàng thì redirect 
      if(url.includes('customerweb')){
        this.router.navigate(['dashboard'])
        return;
      }
      this.authenService.isAuthen = true;
      this.employeeSer.getAccByCode(this.common.getCookie('token_key')).subscribe((data => {
        this.authenService.id_role = data['id_role'];
        this.employeeSer.getDetailEmployebyCode(jwt_decode(this.common.getCookie('token_key'))['sub']).subscribe((data => {
          this.authenService.empolyeeInfo = data;
        }))
        if(url.includes('login')){
          if(this.authenService.id_role == '2'){
            this.router.navigate(['dashboard']);
          } else if (this.authenService.id_role == '1'){
            this.router.navigate(['employee-manage']);
          } else if (this.authenService.id_role == '3'){
            this.router.navigate(['appraiser-request-manage']);
          }
          
          return;
        } else if(url.substring(22,url.length) === ''){
          return;
        }
       }));
    }
  }

  public openLeftSide() {
    this.isOpened = !this.isOpened;
    this.sidenav.toggle();
  }

  public closeLeftSide() {
    this.isOpened = false;
  }

  public logout(){
    this.authenService.isAuthen = false;
    this.common.deleteCookie("token_key");
    this.router.navigate(['login']);
    this.closeLeftSide();
  }

  


}
