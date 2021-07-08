import { IllustrationSubBenifit } from "./IllustrationSubBenifit";

export class RelatedPersonInfo{
    full_name_insured_persion_extra:String;
    insurance_buyer_relation_extra_insured_person:String;
    dob_extra_insured_person:Date;
    gender_extra_insured_person:boolean;
    carrier_group_extra_insured_person:number;

    listSubInterset:Array<IllustrationSubBenifit>;

    constructor(full_name:string,relation:string,date_of_birth:Date,gender:boolean,carreer_group:number){
        this.full_name_insured_persion_extra = full_name;
        this.insurance_buyer_relation_extra_insured_person = relation;
        this.dob_extra_insured_person = date_of_birth;
        this.gender_extra_insured_person = gender;
        this.carrier_group_extra_insured_person = carreer_group;
    }
}
