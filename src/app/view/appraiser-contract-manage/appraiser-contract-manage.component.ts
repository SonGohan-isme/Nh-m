import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-appraiser-contract-manage',
  templateUrl: './appraiser-contract-manage.component.html',
  styleUrls: ['./appraiser-contract-manage.component.css']
})
export class AppraiserContractManageComponent implements OnInit {

  constructor(private common:CommonService) { }

  ngOnInit(): void {
    this.common.titlePage = "Danh Sách Hợp Đồng";
  }

}
