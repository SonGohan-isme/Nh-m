import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContractChangeHistory } from 'src/app/model/ContractChangeHistory';
import { ContractDTO } from 'src/app/model/ContractDTO';
import { ContractService } from 'src/app/services/contract/contract.service';

@Component({
  selector: 'app-detail-info-change-history',
  templateUrl: './detail-info-change-history.component.html',
  styleUrls: ['./detail-info-change-history.component.css']
})
export class DetailInfoChangeHistoryComponent implements OnInit {

  constructor(private contractService: ContractService,private activateRoute: ActivatedRoute) { }

  oldInfomation : ContractChangeHistory;
  newInfomation : ContractDTO;
  ngOnInit(): void {
    this.contractService.getDetailContractChangeHistory(this.activateRoute.snapshot.params['id']).subscribe((data =>{
      this.oldInfomation = data;
      this.contractService.getDetailContract(this.oldInfomation.id_contract).subscribe((data =>{
        this.newInfomation = data;
      }))
    }))

   

  }

}
