import { SubBenefitScale } from "./SubBenefitScale";

export class IllustrationSubBenifit {
    id_illustration: number;
    id_sub_benifit: number;
    full_name_insured_persion_extra: string;
    insurance_buyer_relation_extra_insured_person: string;
    dob_extra_insured_person: Date;
    age_extra_insured_person: number;
    gender_extra_insured_person: boolean;
    carrier_group_extra_insured_person: number;
    denominations: number;
    fee_value: number;
    is_extra_insured_person: boolean;
    id_related_person: number;

    listSubBenefitScale: Array<SubBenefitScale>

    constructor(id_illustration: number,
        id_sub_benifit: number,
        full_name_insured_persion_extra: string,
        insurance_buyer_relation_extra_insured_person: string,
        dob_extra_insured_person: Date,
        age_extra_insured_person: number,
        gender_extra_insured_person: boolean,
        carrier_group_extra_insured_person: number,
        denominations: number,
        fee_value: number,
        is_extra_insured_person: boolean,
        id_related_person: number) {
        this.id_illustration = id_illustration;
        this.id_sub_benifit = id_sub_benifit;
        this.full_name_insured_persion_extra = full_name_insured_persion_extra;
        this.insurance_buyer_relation_extra_insured_person = insurance_buyer_relation_extra_insured_person;
        this.dob_extra_insured_person = dob_extra_insured_person;
        this.age_extra_insured_person = age_extra_insured_person;
        this.carrier_group_extra_insured_person = carrier_group_extra_insured_person;
        this.gender_extra_insured_person = gender_extra_insured_person;
        this.denominations = denominations;
        this.fee_value = fee_value;
        this.is_extra_insured_person = is_extra_insured_person;
        this.id_related_person = id_related_person;
    }
}