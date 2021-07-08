import { IllustrationMainBenifit } from "./IllustrationMainBenifit";
import { IllustrationSubBenifit } from "./IllustrationSubBenifit";

export class Illustration{
    id:number;
    id_customer_info:number;
    create_time:Date;
    benifit_name:String;
    total_fee:number;
    payment_period_id:number;

    illustrationMainBenifit:IllustrationMainBenifit;
    illustrationSubBenifitList:Array<IllustrationSubBenifit>;


    constructor(id:number,
        id_customer_info:number,
        create_time:Date,
        benifit_name:String,
        total_fee:number,
        payment_period_id:number,
        illustrationMainBenifit:IllustrationMainBenifit,
        illustrationSubBenifitList:Array<IllustrationSubBenifit>,){

            this.id = id;
            this.id_customer_info = id_customer_info;
            this.create_time = create_time;
            this.benifit_name = benifit_name;
            this.total_fee = total_fee;
            this.payment_period_id = payment_period_id;
            this.illustrationMainBenifit = illustrationMainBenifit;
            this.illustrationSubBenifitList = illustrationSubBenifitList;
    }

}