import { MainBenefitScale } from "./MainBenefitScale";

export class IllustrationMainBenifit {
    id_illustration: number;
    id_main_benifit: number;
    full_name_insured_person: string;
    birth_date_insured_person: Date;
    age_insured_person: number;
    gender_insured_person: boolean;
    carrier_group_insured_person: number;
    full_name_insurance_buyer: string;
    insurance_buyer_relation_insured_person: string;
    fee_value: number;
    denominations: number;

    constructor(
        id_illustration: number,
        id_main_benifit: number,
        full_name_insured_person: string,
        birth_date_insured_person: Date,
        age_insured_person: number,
        gender_insured_person: boolean,
        carrier_group_insured_person: number,
        full_name_insurance_buyer: string,
        insurance_buyer_relation_insured_person: string,
        fee_value: number,
        denominations: number) {
        this.id_illustration = id_illustration;
        this.id_main_benifit = id_main_benifit;
        this.full_name_insured_person = full_name_insured_person;
        this.birth_date_insured_person = birth_date_insured_person;
        this.age_insured_person = age_insured_person;
        this.gender_insured_person = gender_insured_person;
        this.carrier_group_insured_person = carrier_group_insured_person;
        this.full_name_insurance_buyer = full_name_insurance_buyer;
        this.insurance_buyer_relation_insured_person = insurance_buyer_relation_insured_person;
        this.fee_value = fee_value;
        this.denominations = denominations;
    }
}