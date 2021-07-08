import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-commission-manage',
  templateUrl: './admin-commission-manage.component.html',
  styleUrls: ['./admin-commission-manage.component.css']
})
export class AdminCommissionManageComponent implements OnInit {

  pageTitle: string = "Phần Trăm Hoa Hồng";
  status: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  displayAddCommissionDialog(): void {
    this.status = !this.status;
  }

}
