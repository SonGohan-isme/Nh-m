export class Income{
    id:number;
    description:string;
    income:number;
    revenue_val:number;
    start_time:Date;
    end_time:Date;
    create_time:Date;

    constructor(id:number,
        description:string,
        income:number,
        revenue_val:number,
        start_time:Date,
        end_time:Date,
        create_time:Date){
            this.id = id;
            this.description = description;
            this.income = income;
            this.revenue_val = revenue_val;
            this.start_time = start_time;
            this.end_time = end_time;
            this.create_time = create_time;
        }
}