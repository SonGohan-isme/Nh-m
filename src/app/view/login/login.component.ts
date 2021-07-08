import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/services/common/common.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import  jwt_decode  from 'jwt-decode';
import { SigInData } from '../../model/SigInData';
import { AuthenService } from '../../services/authen/authen.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private employeeSer:EmployeeService,private authenService:AuthenService,private router: Router,private authenticationService:AuthenService,private common:CommonService) { }

  ngOnInit(): void {
  }

  onSubmit(sigInForm: NgForm){
    const sigInData = new SigInData(sigInForm.value.code,sigInForm.value.pass);
    this.authenticationService.authenticate(sigInData);
  }

  
}
