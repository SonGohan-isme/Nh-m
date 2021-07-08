export class CustomerInfo {
    id: number;
    birth_date: Date;
    age: number;
    birth_address: string;
    types_identification: string;
    id_card: string;
    nationality_1: string;
    nationality_2: string;
    nation: string;
    job: string;
    career: string;
    position: string;
    occupation_group: string;
    company_name: string;
    main_business: string;
    specific_work: string;
    monthly_income: string;
    code: string;
    gender:number;
    id_contract:number;
    id_illustration:number;
    code_em_support:string;
    conadd_no_street: string;
    conadd_city: string;
    conadd_district: string;
    conadd_wards: string;
    curadd_no_street: string;
    curadd_city: string;
    curadd_district: string;
    curadd_wards: string;
    peradd_no_street: string;
    peradd_city: string;
    peradd_district: string;
    peradd_wards: string;
    workadd_no_street: string;
    workadd_city: string;
    workadd_district: string;
    workadd_wards: string;
    email: string;
    phone_1: string;
    phone_2: string;
    id_account: number
    full_name: string;
    updated_time:Date;
    marital_status:number;
    created_time:Date;
    source:string;
    status:number;


    

    constructor(id: number, birth_date: Date, age: number, birth_address: string, types_identification: string, id_card: string, nationality_1: string, nationality_2: string,
        nation: string, job: string, career: string, position: string, occupation_group: string, company_name: string, main_business: string, specific_work: string, monthly_income: string,
        id_current_address: number, id_permanent_address: number, id_contact_address: number, id_workplace_address: number, email: string, phone_1: string, phone_2: string, id_account: number, full_name: string
        , conadd_no_street: string, conadd_city: string, conadd_district: string, conadd_wards: string, curadd_no_street: string, curadd_city: string,
        curadd_district: string, curadd_wards: string, peradd_no_street: string, peradd_city: string, peradd_district: string, peradd_wards: string,
        workadd_no_street: string, workadd_city: string, workadd_district: string, workadd_wards: string, code: string,gender:number,
        ethnic:string,id_contract:number,id_illustration:number,code_em_support : string,updated_time:Date,marital_status:number,created_time:Date,source:string,status:number) {

        this.id = id;
        this.birth_date = birth_date;
        this.age = age;
        this.birth_address = birth_address;
        this.types_identification = types_identification;
        this.id_card = id_card;
        this.nationality_1 = nationality_1;
        this.nationality_2 = nationality_2;
        this.gender = gender;
        this.id_illustration = id_illustration;
        this.id_contract = id_contract;
        this.nation = nation;
        this.job = job;
        this.career = career;
        this.position = position;
        this.occupation_group = occupation_group;
        this.company_name = company_name;
        this.main_business = main_business;
        this.specific_work = specific_work;
        this.monthly_income = monthly_income;
        this.code_em_support = code_em_support;
        this.conadd_no_street = conadd_no_street;
        this.conadd_city = conadd_city;
        this.conadd_district = conadd_district;
        this.conadd_no_street = conadd_wards;
        this.curadd_no_street = curadd_no_street;
        this.curadd_city = curadd_city;
        this.curadd_district = curadd_district;
        this.curadd_wards = curadd_wards;
        this.peradd_no_street = peradd_no_street;
        this.peradd_city = peradd_city;
        this.peradd_district = peradd_district;
        this.peradd_wards = peradd_wards;
        this.workadd_no_street = workadd_no_street;
        this.workadd_city = workadd_city;
        this.workadd_district = workadd_district;
        this.workadd_wards = workadd_wards;
        this.email = email;
        this.phone_1 = phone_1;
        this.phone_2 = phone_2;
        this.full_name = full_name;
        this.code = code;
        this.id_account = id_account;
        this.updated_time = updated_time;
        this.marital_status = marital_status;
        this.created_time = created_time;
        this.source = source;
        this.status = status;
    }
    getCode(): string {
        return this.code;
    }
    getCuraddNoStreet(): string {
        return this.curadd_no_street;
    }
    getCuraddCity(): string {
        return this.curadd_city;
    }
    getCodeEmSupport() : string{
        return this.code_em_support;
    }
    getPeraddNoStreet(): string {
        return this.peradd_no_street;
    }
    getCuraddDistrict(): string {
        return this.curadd_district;
    }
    getCuraddWards(): string {
        return this.curadd_wards;
    }
    getPeraddCity(): string {
        return this.peradd_city;
    }
    getPeraddDistrict(): string {
        return this.peradd_district;
    }
    getPeraddWards(): string {
        return this.peradd_wards;
    }
    getWorkaddNoStreet(): string {
        return this.workadd_no_street;
    }
    getWorkaddCity(): string {
        return this.workadd_city;
    }
    getWorkaddDistrict(): string {
        return this.workadd_district;
    }
    getWorkaddWards(): string {
        return this.workadd_wards;
    }
    getConaddNoStreet(): string {
        return this.conadd_no_street;
    }
    getConaddCity(): string {
        return this.conadd_city;
    }
    getConaddDistrict(): string {
        return this.conadd_district;
    }
    getConaddWards(): string {
        return this.conadd_wards;
    }
    getFullName(): string {
        return this.full_name;
    }
    getId(): number {
        return this.id;
    }

    getBirth_date(): Date {
        return this.birth_date;
    }

    getAge(): number {
        return this.age;
    }

    getBith_adress(): string {
        return this.birth_address;
    }

    getTypesIdentification(): string {
        return this.types_identification;
    }
    getID_card(): string {
        return this.id_card;
    }
    getNationality_1(): string {
        return this.nationality_1;
    }
    getNationality_2(): string {
        return this.nationality_2;
    }
    getNation(): string {
        return this.nation;
    }
    getJob(): string {
        return this.job;
    }
    getCareer(): string {
        return this.career;
    }
    getPosition(): string {
        return this.position;
    }
    getOccupation_group(): string {
        return this.occupation_group;
    }
    getCompany_name(): string {
        return this.company_name;
    }
    getMain_business(): string {
        return this.main_business;
    }
    getSpecific_work(): string {
        return this.specific_work;
    }
    getMonthly_income(): string {
        return this.monthly_income;
    }
    getEmail(): string {
        return this.email;
    }
    getPhone_1(): string {
        return this.phone_1;
    }
    getPhone_2(): string {
        return this.phone_2;
    }
    getId_account(): number {
        return this.id_account;
    }
}