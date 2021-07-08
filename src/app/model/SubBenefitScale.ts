export class SubBenefitScale {
    id: number;
    name: string;
    scale: number;
    id_sub_benefit;

    constructor(
        id: number,
        name: string,
        scale: number,
        id_sub_benefit
    ) {
        this.id = id;
        this.name = name;
        this.scale = scale;
        this.id_sub_benefit = id_sub_benefit;
    }
}