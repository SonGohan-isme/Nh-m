export class Contract{
    id:number;
    id_customer:number;
    name_contract_owner:String;
    payment_period_id:number;
    insurance_type:String;
    id_main_benifit:number;
    id_illustration:number;
    start_time:Date;
    end_time:Date;
    status:boolean;
    approval_status:String;
    contract_total_value:number; 
    code_em_support:string;
    
    constructor(id:number,id_customer:number,name_contract_owner:String,payment_period_id:number,insurance_type:String,id_main_benifit:number,id_illustration:number,start_time:Date,end_time:Date,status:boolean,approval_status:String,contract_total_value:number,code_em_support:string){
        this.id = id;
        this.id_customer = id_customer;
        this.name_contract_owner = name_contract_owner;
        this.payment_period_id = payment_period_id;
        this.insurance_type = insurance_type;
        this.id_main_benifit = id_main_benifit;
        this.id_illustration = id_illustration;
        this.start_time = start_time;
        this.end_time = end_time;
        this.status = status;
        this.approval_status = approval_status;
        this.contract_total_value = contract_total_value; 
        this.code_em_support = code_em_support;
    }
}
