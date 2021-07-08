export class DetailCommission{
     id:number;
     id_detail_payment_period:number;
     price_insurance_upperbound:number;
     price_insurance_lowerbound:number;
     commission:number;

     constructor(id:number,
        id_detail_payment_period:number,
        price_insurance_upperbound:number,
        price_insurance_lowerbound:number,
        commission:number){
            this.id = id;
            this.id_detail_payment_period = id_detail_payment_period;
            this.price_insurance_upperbound = price_insurance_upperbound;
            this.price_insurance_lowerbound = price_insurance_lowerbound;
            this.commission = commission;
     }
}