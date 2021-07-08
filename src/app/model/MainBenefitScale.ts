export class MainBenefitScale {
    id: number;
    name: string;
    scale: number;
    id_main_benefit;

    constructor(
        id: number,
        name: string,
        scale: number,
        id_main_benefit
    ) {
        this.id = id;
        this.name = name;
        this.scale = scale;
        this.id_main_benefit = id_main_benefit;
    }
}