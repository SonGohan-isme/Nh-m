import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-labour-contract',
  templateUrl: './labour-contract.component.html',
  styleUrls: ['./labour-contract.component.css']
})
export class LabourContractComponent implements OnInit {

  constructor(private common:CommonService) { }

  ngOnInit(): void {
    this.common.titlePage = "Hợp Đồng Lao Động";
  }

}
