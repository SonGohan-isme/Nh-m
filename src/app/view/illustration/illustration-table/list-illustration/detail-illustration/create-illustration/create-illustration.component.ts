import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomerInfo } from 'src/app/model/CustomerInfo';
import { Illustration } from 'src/app/model/Illustration';
import { IllustrationMainBenifit } from 'src/app/model/IllustrationMainBenifit';
import { IllustrationSubBenifit } from 'src/app/model/IllustrationSubBenifit';
import { Benifit } from 'src/app/model/Benifit';
import { MultiplierForPaymentPeriod } from 'src/app/model/MultiplierForPaymentPeriod';
import { Referencetable } from 'src/app/model/Referencetable';
import { RelatedPerson } from 'src/app/model/RelatedPerson';
import { CommonService } from 'src/app/services/common/common.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { IllustrationService } from 'src/app/services/illustration/illustration.service';
import { BenifitService } from 'src/app/services/benifit/benifit.service';
import { RefertableService } from 'src/app/services/refertable/refertable.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { RelatedPersonService } from 'src/app/services/relatedPerson/related-person.service';

@Component({
  selector: 'app-create-illustration',
  templateUrl: './create-illustration.component.html',
  styleUrls: ['./create-illustration.component.css']
})
export class CreateIllustrationComponent implements OnInit {

  constructor(private relateSer: RelatedPersonService, private snackBar: SnackbarService, private spinner: NgxSpinnerService,
    private referenceTable: RefertableService, private illustService: IllustrationService,
    private benifit: BenifitService, private activeRoute: ActivatedRoute,
    private common: CommonService, private customerService: CustomerService) {
  }

  // biến dùng để xuất pdf
  @ViewChild('content') content: ElementRef;

  relatedPerson = new Array<RelatedPerson>();
  customerInfo = new CustomerInfo(0, new Date(), 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, 0, 0, 0, '', '', '', 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, '', 0, 0, '', new Date(), 0, new Date(), '', 0);
  mainBenifitList: Array<Benifit>;
  subBenifitList: Array<Benifit>;
  subBenifitListCopy: Array<Benifit>;
  mainBenifitSelect = new Benifit;
  reference = new Referencetable();

  // disable button lưu bảng minh họa
  checkedTick = false;

  // disble button tính phí
  checkCountPayment = false;

  //hệ số định kỳ hàng năm
  mulPeriod: MultiplierForPaymentPeriod;

  //tổng số tiền bảo hiểm cuối cùng
  totalPayment = 0;

  // lấy id của illustration từ đường Link
  id_ill: number;



  //Them cac bien thuoc bang minh hoa o day

  create_time_ill: Date;

  illustrationMainBenifit = new IllustrationMainBenifit(0, this.mainBenifitSelect.id, '', null, 0, false, 1, '', "Bản thân", 0, 0);

  illustration = new Illustration(0, 0, new Date(), this.mainBenifitSelect.benifit_name, 0, 0, this.illustrationMainBenifit, []);



  //Them cac bien thuoc bang minh hoa o day


  ngOnInit(): void {
    this.getAllSubBenifit();
    this.getAllMainBenifit();
    this.getInfoCustomer();
    this.referenceTable.getAllReference().subscribe((data => {
      this.reference = data;
    }))
  }

  carrer_groups = Array[3] = [
    { value: 1, viewValue: '1' },
    { value: 2, viewValue: '2' },
    { value: 3, viewValue: '3' },
  ];



  onCalculate() {
    let checkSubmit = true;
    if (this.create_time_ill != null
      && this.illustrationMainBenifit.full_name_insured_person != ""
      && this.illustrationMainBenifit.birth_date_insured_person != null
      && this.illustrationMainBenifit.insurance_buyer_relation_insured_person != null
      && this.illustrationMainBenifit.denominations != 0
      && this.illustrationMainBenifit.denominations != null
      && this.mulPeriod != null) {
      if (this.illustrationMainBenifit.denominations.toString().includes("-")) {
        this.snackBar.openSnackBar("Vui lòng điền các trường đầy đủ và mệnh giá hợp lệ", "Đóng");
        return;
      }
      if (this.subBenifitListCopy.length != 0) {
        for (let item of this.subBenifitListCopy) {
          if (!item.isDisable) {
            if (item.denominations == 0 || item.denominations == null || item.denominations.toString().includes("-")) {
              this.snackBar.openSnackBar("Vui lòng điền các trường đầy đủ và mệnh giá hợp lệ", "Đóng");
              checkSubmit = false;
              break;
            }
          }
        }
      }

      if (this.relatedPerson.length != 0) {
        for (let relate of this.relatedPerson) {
          if (relate.full_name != null
            && relate.relation != null
            && relate.date_of_birth != null) {
            if (relate.listSubBenifit.length != 0) {
              for (let benifit of relate.listSubBenifit) {
                if (!benifit.isDisable) {
                  if (benifit.denominations == 0 || benifit.denominations == null || benifit.denominations.toString().includes("-")) {
                    this.snackBar.openSnackBar("Vui lòng điền các trường đầy đủ và mệnh giá hợp lệ", "Đóng");
                    checkSubmit = false;
                    break;
                  }
                }
              }
            }
          } else {
            this.snackBar.openSnackBar("Vui lòng điền các trường đầy đủ và mệnh giá hợp lệ", "Đóng");
            checkSubmit = false;
            break;
          }
        }
      }
      //tinh chi phi
      if (checkSubmit) {
        this.spinner.show();
        if (this.reference.multiplierForAge.length != 0) {
          this.CalculateFee(this.reference, this.illustration);
        } else {
          this.snackBar.openSnackBar("Vui Lòng Tải Lại Trang", 'Đóng');
        }
        this.spinner.hide();
        this.checkedTick = true;
      }

    } else {
      this.snackBar.openSnackBar("Vui lòng điền các trường đầy đủ và mệnh giá hợp lệ", "Đóng");
    }

  }

  CalculateFee(ref: Referencetable, illustration: Illustration) {
    this.totalPayment = 0;
    // phí của gói quyền lợi chính
    this.illustrationMainBenifit.fee_value = Math.round(ref.multiplierForMainBenifit.find(i => i.main_benifit_id == this.mainBenifitSelect.id)['multiplier'] *
      this.illustrationMainBenifit.denominations * ref.multiplierForGenders.find(i => i.gender == this.illustrationMainBenifit.gender_insured_person ? '1' : '0')['multiplier'] *
      (1 + this.calculateAge(this.illustrationMainBenifit.birth_date_insured_person) * ref.multiplierForAge.find(i => i.age == this.calculateAge(this.illustrationMainBenifit.birth_date_insured_person))['multiplier']) *
      ref.multiplierForCareerGroup.find(i => i.group_number == this.illustrationMainBenifit.carrier_group_insured_person)['multiplier']);

    // cộng vào tổng giá trị
    this.totalPayment += this.illustrationMainBenifit.fee_value;

    // phí của gói quyền lợi phụ của người được bảo hiểm
    if (this.subBenifitListCopy.find(i => i.isDisable == false)) {// kiểm tra xem người được bảo hiểm có quyền lợi phụ hay không
      for (let item of this.subBenifitListCopy) {
        if (!item.isDisable) {// tìm kiếm những trường đã được tích chọn
          item.fee_value = Math.round(item.denominations * ref.multiplierForSubBenifit.find(i => i.sub_benifit_id == item.id)['multiplier'] *
            ref.multiplierForGenders.find(i => i.gender == this.illustrationMainBenifit.gender_insured_person ? '1' : '0')['multiplier'] *
            (1 + this.calculateAge(this.illustrationMainBenifit.birth_date_insured_person) * ref.multiplierForAge.find(i => i.age == this.calculateAge(this.illustrationMainBenifit.birth_date_insured_person))['multiplier']) *
            ref.multiplierForCareerGroup.find(i => i.group_number == this.illustrationMainBenifit.carrier_group_insured_person)['multiplier']);

          // cộng vào tổng giá trị
          this.totalPayment += item.fee_value;

        } else {
          item.fee_value = 0;
        }
      }
    }


    // phí của gói quyền lợi phụ của những người liên quan
    for (let relate of this.relatedPerson) {
      for (let benifit of relate.listSubBenifit) {
        if (!benifit.isDisable) {
          benifit.fee_value = Math.round(benifit.denominations * ref.multiplierForSubBenifit.find(i => i.sub_benifit_id == benifit.id)['multiplier'] *
            ref.multiplierForGenders.find(i => i.gender == relate.gender ? '1' : '0')['multiplier'] *
            (1 + this.calculateAge(relate.date_of_birth) * ref.multiplierForAge.find(i => i.age == this.calculateAge(relate.date_of_birth))['multiplier']) *
            ref.multiplierForCareerGroup.find(i => i.group_number == relate.carreer_group)['multiplier']);

          // cộng vào tổng giá trị
          this.totalPayment += benifit.fee_value;

        } else {
          benifit.fee_value = 0;
        }
      }
    }

    // tổng kết totalPayment
    this.totalPayment = Math.round(this.totalPayment * this.mulPeriod.multiplier);

    this.illustration.total_fee = this.totalPayment;
    this.illustration.payment_period_id = this.mulPeriod.priod_id;

  }

  addField() {
    var relatedPer1 = new RelatedPerson(0, '', '', null, true, 1, []);
    // deep copy this.subBenifitList
    let list = this.subBenifitList.map(x => Object.assign({}, x));
    relatedPer1.listSubBenifit = list
    if (this.relatedPerson.length < 10) {
      this.relatedPerson.push(relatedPer1);
    }
  }

  getAllMainBenifit() {
    this.benifit.getAllMainBenifit().subscribe((data => {
      for (let benifit of data) {
        benifit.isDisable = true;
      }
      this.mainBenifitSelect = data[0];
      this.mainBenifitList = data;
    }))
  }

  getAllSubBenifit() {
    this.benifit.getAllSubBenifit().subscribe((data => {
      for (let benifit of data) {
        benifit.isDisable = true;
      }
      this.subBenifitList = data;
      this.subBenifitListCopy = this.subBenifitList.map(x => Object.assign({}, x));

    }))
  }

  getInfoCustomer() {
    this.activeRoute.queryParams.subscribe(params => {
      this.customerService.getOneCustomerInfoBySaler(params['id'], this.common.getCookie('token_key')).subscribe((data => {
        this.customerInfo = data[0];
        this.illustrationMainBenifit.full_name_insurance_buyer = this.customerInfo.full_name;
        this.illustrationMainBenifit.id_illustration = params['id'];
        this.id_ill = params['id'];
      }))
    })
  }

  removeField(index: number) {
    if (index > -1) {
      this.relatedPerson.splice(index, 1);
    }
  }

  activeSubIllustration(index: number) {
    this.subBenifitListCopy[index].isDisable = !this.subBenifitListCopy[index].isDisable;
    return;
  }

  insuranceBuyerRelationValue() {
    let value = (<HTMLInputElement>document.getElementById('buyerRelation')).value;
    if (value == "Bản Thân") {
      this.illustrationMainBenifit.full_name_insured_person = this.customerInfo.full_name;
      this.illustrationMainBenifit.gender_insured_person = this.customerInfo.gender == 1 ? true : false;
      (<HTMLInputElement>document.getElementById('birthDayInsuredPerson')).value = new Date(this.customerInfo.birth_date).getFullYear() + "-" +
        (new Date(this.customerInfo.birth_date).getMonth() < 10 ? "0" + (new Date(this.customerInfo.birth_date).getMonth() + 1) : new Date(this.customerInfo.birth_date).getMonth() + 1) + "-" +
        (new Date(this.customerInfo.birth_date).getDate() < 10 ? "0" + (new Date(this.customerInfo.birth_date).getDate() + 1) : new Date(this.customerInfo.birth_date).getDate() + 1);
      this.illustrationMainBenifit.birth_date_insured_person = new Date(this.customerInfo.birth_date);
      this.illustrationMainBenifit.carrier_group_insured_person = Number(this.customerInfo.occupation_group);
    }
    console.log(this.illustrationMainBenifit.gender_insured_person)
  }

  checkMoneyFormat() {

  }


  activeSubIllustrationRelatedPerson(indexParent: number, indexChild: number) {
    this.relatedPerson[indexParent].listSubBenifit[indexChild].isDisable = !this.relatedPerson[indexParent].listSubBenifit[indexChild].isDisable;
    return;
  }

  calculateAge(birthday: Date) {
    var diff_ms = Date.now() - new Date(birthday).getTime();
    var age_dt = new Date(diff_ms);
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

  dowloadPDF() {
    window.print();
  }

  // giá trị i tăng mỗi lần gọi đệ quy
  i = 0;

  // hàm đệ quy
  next() {
    var relatePer = this.relatedPerson[this.i];
    this.relateSer.addRelatedPerson({
      full_name: relatePer.full_name,
      date_of_birth: relatePer.date_of_birth, gender: relatePer.gender,
      carreer_group: relatePer.carreer_group, relation: relatePer.relation,
      id_illustration: this.id_ill
    }).subscribe((data => {


      for (let benifit of relatePer.listSubBenifit) {
        if (!benifit.isDisable) {
          this.activeRoute.queryParams.subscribe(params => {
            this.illustration.illustrationSubBenifitList.push(new IllustrationSubBenifit(params['id'], benifit.id, relatePer.full_name
              , relatePer.relation, relatePer.date_of_birth, this.calculateAge(relatePer.date_of_birth), relatePer.gender, relatePer.carreer_group, benifit.denominations, benifit.fee_value
              , true, data));
          })
        }
      }
      // phải chạy đến phần tử cuối cùng của mảng thì mới cho phép lưu bảng minh họa
      if (this.i == this.relatedPerson.length - 1) {
        this.i = 0;
        this.processSaveIntoDB();
      } else {
        this.i++;
        this.next();
      }


    }))
  }


  processSaveIntoDB() {
    this.illustration.illustrationMainBenifit.id_main_benifit = this.mainBenifitSelect.id;
    this.illustration.id_customer_info = this.customerInfo.id;
    this.illustration.illustrationMainBenifit.age_insured_person = this.calculateAge(this.illustrationMainBenifit.birth_date_insured_person);



    this.illustService.saveOneIllustration(this.illustration).subscribe((data => {
      this.snackBar.openSnackBar("Lưu Bảng Minh Họa Thành Công", "Đóng");
      this.spinner.hide();
      this.checkedTick = false;
      this.checkCountPayment = true;
    }))
  }

  save() {
    //validate
    if (this.create_time_ill != null
      && this.illustrationMainBenifit.full_name_insured_person != ""
      && this.illustrationMainBenifit.birth_date_insured_person != null
      && this.illustrationMainBenifit.insurance_buyer_relation_insured_person != null
      && this.illustrationMainBenifit.denominations != 0
      && this.illustrationMainBenifit.denominations != null
      && this.mulPeriod != null) {

      if (this.illustrationMainBenifit.denominations.toString().includes("-")) {
        this.snackBar.openSnackBar("Vui lòng điền các trường đầy đủ và mệnh giá hợp lệ", "Đóng");
        return;
      }

      if (this.subBenifitListCopy.length != 0) {
        for (let item of this.subBenifitListCopy) {
          if (!item.isDisable) {
            if (item.denominations == 0 || item.denominations == null || item.denominations.toString().includes("-")) {
              this.snackBar.openSnackBar("Vui lòng điền các trường đầy đủ và mệnh giá hợp lệ", "Đóng");
              return;
            }else if(item.fee_value == 0 && item.denominations){
              this.snackBar.openSnackBar("Vui lòng nhấn tính phí bảo hiểm cho các giá trị mới", "Đóng");
              return;
            }
          }
        }
      }

      if (this.relatedPerson.length != 0) {
        for (let relate of this.relatedPerson) {
          if (relate.full_name != null
            && relate.relation != null
            && relate.date_of_birth != null) {
            if (relate.listSubBenifit.length != 0) {
              for (let benifit of relate.listSubBenifit) {
                if (!benifit.isDisable) {
                  if (benifit.denominations == 0 || benifit.denominations == null || benifit.denominations.toString().includes("-")) {
                    this.snackBar.openSnackBar("Vui lòng điền các trường đầy đủ và mệnh giá hợp lệ", "Đóng");
                    return;
                  } else if(benifit.fee_value == 0 && benifit.denominations){
                    this.snackBar.openSnackBar("Vui lòng nhấn tính phí bảo hiểm cho các giá trị mới", "Đóng");
                    return;
                  }
                }
              }
            }
          } else {
            this.snackBar.openSnackBar("Vui lòng điền các trường đầy đủ và mệnh giá hợp lệ", "Đóng");
            return;
          }
          
        }
      }
    }
      else {
        this.snackBar.openSnackBar("Vui lòng điền các trường đầy đủ và mệnh giá hợp lệ", "Đóng");
        return;
      }


      this.spinner.show();
      this.illustration.illustrationSubBenifitList = [];
      // thêm người được bảo vệ bằng các quyền lợi bổ sung
      this.relateSer.addRelatedPerson({
        full_name: this.illustrationMainBenifit.full_name_insured_person,
        date_of_birth: this.illustrationMainBenifit.birth_date_insured_person, gender: this.illustrationMainBenifit.gender_insured_person,
        carreer_group: this.illustrationMainBenifit.carrier_group_insured_person, relation: this.illustrationMainBenifit.insurance_buyer_relation_insured_person,
        id_illustration: this.id_ill
      }).subscribe((data => {
        for (let benifit of this.subBenifitListCopy) {
          if (!benifit.isDisable) {
            this.activeRoute.queryParams.subscribe(params => {

              let subBenifit = new IllustrationSubBenifit(params['id'], benifit.id, this.illustrationMainBenifit.full_name_insured_person
                , this.illustrationMainBenifit.insurance_buyer_relation_insured_person, this.illustrationMainBenifit.birth_date_insured_person, this.calculateAge(this.illustrationMainBenifit.birth_date_insured_person),
                this.illustrationMainBenifit.gender_insured_person, this.illustrationMainBenifit.carrier_group_insured_person, benifit.denominations,
                benifit.fee_value, false, data);


              this.illustration.illustrationSubBenifitList.push(subBenifit);
            })
          }
        }
        // lưu các người được bảo hiểm khác và lấy id của họ gắn vào cho mỗi illustrationSubBenifit
        // vì callback được gọi lồng nhau nên không thể dùng for loop mà ta cần dùng đệ quy
        if (this.relatedPerson.length != 0) {
          this.next();
        } else {
          this.processSaveIntoDB();

        }

      }))
    }
  changeDate(date: any) {
    this.illustrationMainBenifit.birth_date_insured_person = new Date(date);
  }
}





