export class EmployeeInfoDTO {
    id: number;
    name: String;
    address: String;
    age:number;
    date_of_birth: Date;
    email: String;
    phone: String;
    id_card: String;
    id_certificate: String;
    start_time: Date;
    end_time: Date;
    gender: boolean;
    dept_id: number;
    id_acc: number;
    id_labour_contract: number;
    id_current_address: number;
    id_permanent_address: number;
    id_contact_address: number;
    marital_status: boolean;
    national: String;
    conadd_city: String;
    conadd_district: String;
    conadd_no_street: String;
    conadd_wards: String;
    curadd_city: String;
    curadd_district: String;
    curadd_no_street: String;
    curadd_wards: String;
    peradd_city: String;
    peradd_district: String;
    peradd_no_street: String;
    peradd_wards: String;
    code_ap_support:string;
    in_dept : string;
    code :string;
    status:boolean;

    constructor(id: number,
        name: String,
        address: String,
        date_of_birth: Date,
        age:number,
        email: String,
        phone: String,
        id_card: String,
        id_certificate: String,
        start_time: Date,
        end_time: Date,
        gender: boolean,
        dept_id: number,
        id_acc: number,
        id_labour_contract: number,
        id_current_address: number,
        id_permanent_address: number,
        id_contact_address: number,
        marital_status: boolean,
        national: String,
        conadd_city: String,
        conadd_district: String,
        conadd_no_street: String,
        conadd_wards: String,
        curadd_city: String,
        curadd_district: String,
        curadd_no_street: String,
        curadd_wards: String,
        peradd_city: String,
        peradd_district: String,
        peradd_no_street: String,
        peradd_wards: String,code_ap_support:string,in_dept : string,
        code :string,
        status:boolean,) {
       this.id = id;
       this.address = address;
       this.name = name;
       this.age = age;
       this.date_of_birth = date_of_birth;
       this.email = email;
       this.phone = phone;
       this.id_card = id_card;
       this.id_certificate = id_certificate;
       this.start_time = start_time;
       this.end_time = end_time;
       this.gender = gender;
       this.dept_id = dept_id;
       this.id_acc = id_acc;
       this.id_labour_contract = id_labour_contract;
       this.id_current_address = id_current_address;
       this.id_permanent_address = id_permanent_address;
       this.id_contact_address = id_contact_address;
       this.marital_status = marital_status;
       this.national = national;
       this.conadd_city = conadd_city;
       this.conadd_district = conadd_district;
       this.conadd_no_street = conadd_no_street;
       this.conadd_wards = conadd_wards;
       this.curadd_city = curadd_city;
       this.curadd_district = curadd_district;
       this.curadd_no_street = curadd_no_street;
       this.curadd_wards = curadd_wards;
       this.peradd_city = peradd_city;
       this.peradd_district = peradd_district;
       this.peradd_no_street = peradd_no_street;
       this.peradd_wards = peradd_wards;
       this.code_ap_support = code_ap_support;
       this.code = code;
       this.in_dept = in_dept;
       this.status=status;
    }
}