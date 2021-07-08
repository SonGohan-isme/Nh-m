import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Benifit } from 'src/app/model/Benifit';
import { Illustration } from 'src/app/model/Illustration';
import { IllustrationSubBenifit } from 'src/app/model/IllustrationSubBenifit';
import { RelatedPersonInfo } from 'src/app/model/RelatedPersonInfo';
import { BenifitService } from 'src/app/services/benifit/benifit.service';
import { CommonService } from 'src/app/services/common/common.service';
import { IllustrationService } from 'src/app/services/illustration/illustration.service';

@Component({
  selector: 'app-illustration-detail-dialog',
  templateUrl: './illustration-detail-dialog.component.html',
  styleUrls: ['./illustration-detail-dialog.component.css']
})
export class IllustrationDetailDialogComponent implements OnInit {
  
  constructor(public dialogRef: MatDialogRef<IllustrationDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public id: number,private common:CommonService,private benifitSer:BenifitService,
    private illustrationService: IllustrationService, private activateRoute: ActivatedRoute) { }

  subBenifitList: Array<Benifit> = [];
  illustration: Illustration;
  illustrationCopy: Illustration;
  listRelatedPersonNumber: Number[] = [];
  listSubRelatedPerSonBig: Array<any> = [];
  listSubRelatedPerSonSmall: IllustrationSubBenifit[] = [];
  listRelatedPerSonInfo: Array<RelatedPersonInfo> = [];

  ngOnInit(): void {
    if(this.common.getCookie('token_key')){
    this.illustrationService.getIllustrationContractCreate(this.id).subscribe((data1 => {
      this.benifitSer.getAllSubBenifit().subscribe((data => {
        this.subBenifitList = data;
        this.process(data1);
      }))
    }))
  } else{
    this.illustrationService.getIllustContractCreateForCustomerWebsite(this.id).subscribe((data1 => {
      this.benifitSer.getAllSubBenifitForCustomer().subscribe((data => {
        this.subBenifitList = data;
        this.process(data1);
      }))
    }))
  }
}

  public process(data:any){
    this.illustration = data;
      this.illustrationCopy = data;

      if(this.illustration.illustrationSubBenifitList.length != 0){
        //Biến đếm số lượng người 
      var default_number: number = this.illustration.illustrationSubBenifitList[0].id_related_person;
      //tìm số lượng người bảo hiểm phụ và thông tin chi tiết
      for (let i = 0; i < this.illustration.illustrationSubBenifitList.length; i++) {
        if (this.illustration.illustrationSubBenifitList[i].id_related_person == default_number) {
          this.listRelatedPersonNumber.push(default_number);
          let relatedPerson = new RelatedPersonInfo(
            this.illustration.illustrationSubBenifitList[i].full_name_insured_persion_extra,
            this.illustration.illustrationSubBenifitList[i].insurance_buyer_relation_extra_insured_person,
            this.illustration.illustrationSubBenifitList[i].dob_extra_insured_person,
            this.illustration.illustrationSubBenifitList[i].gender_extra_insured_person,
            this.illustration.illustrationSubBenifitList[i].carrier_group_extra_insured_person,
          );   
        this.listRelatedPerSonInfo.push(relatedPerson);
          default_number++;
        }
      }

      // console.log(this.illustration.illustrationSubBenifitList.find(i => i.id_related_person == 1)['id_related_person']);

      //Duyệt qua từng người được bảo hiểm bổ sung
      for (let k = 0; k < this.listRelatedPersonNumber.length; k++) {

        let listSubRelatedPerSonSmall: Array<IllustrationSubBenifit> = [];
        let count: number = 0;
        let id_related_person = this.illustrationCopy.illustrationSubBenifitList[0].id_related_person;

        //tìm những thông tin có related id = nhau
        for (let i = 0; i < this.illustrationCopy.illustrationSubBenifitList.length; i++) {
          if (this.illustrationCopy.illustrationSubBenifitList[i].id_related_person == id_related_person) {
            listSubRelatedPerSonSmall.push(this.illustrationCopy.illustrationSubBenifitList[i]);            
            count = count + 1;
          }
        }
        this.listRelatedPerSonInfo[k].listSubInterset = listSubRelatedPerSonSmall;
        this.listSubRelatedPerSonBig.push(listSubRelatedPerSonSmall);
        //tìm mảng với những giá trị của người liên quan còn lại
        this.illustrationCopy.illustrationSubBenifitList = this.illustrationCopy.illustrationSubBenifitList.slice(count, this.illustrationCopy.illustrationSubBenifitList.length);
      }
      }
      
  }

}
