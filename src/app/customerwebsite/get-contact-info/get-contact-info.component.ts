import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Contact } from 'src/app/model/Contact';
import { District } from 'src/app/model/District';
import { Province } from 'src/app/model/Province';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

@Component({
  selector: 'app-get-contact-info',
  templateUrl: './get-contact-info.component.html',
  styleUrls: ['./get-contact-info.component.css']
})
export class GetContactInfoComponent implements OnInit {

  listProvince: Array<Province> = [];
  listDistrict: Array<District> = [];
  name: string;
  phone: string;
  question: string;
  selectProvince:FormControl = new FormControl();
  selectDistrict:FormControl = new FormControl();

  constructor(private customerSer: CustomerService,  private snackBar: SnackbarService) { }

  ngOnInit(): void {
    this.customerSer.getAllProvince().subscribe((
      data => {
        this.listProvince = data;
      }));
  }

  onChangeProvince(id_province: number) {
    this.customerSer.getAllDistrictByIdProvince(id_province).subscribe((data => {
      this.listDistrict = data;
    }))
  }

  sendContact(){
    let contact = new Contact(0, this.name, this.phone, this.selectProvince.value, this.selectDistrict.value, this.question);
    this.customerSer.addOneContact(contact).subscribe((data => {}));
    this.snackBar.openSnackBar("Gửi Yêu Cầu Thành Công", "Đóng");
  }

}
