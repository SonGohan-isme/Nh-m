export class Revenue{
    id:number ;
    code_employee:string;
    id_contract:number;
    income:number;
    revenue_val:number;
    create_time:Date;

    constructor(id:number,
        code_employee:string,
        id_contract:number,
        income:number,
        revenue_val:number,
        create_time:Date){
            this.id= id;
            this.code_employee= code_employee;
            this.id_contract= id_contract;
            this.income= income;
            this.revenue_val= revenue_val;
            this.create_time= create_time;
    }
}