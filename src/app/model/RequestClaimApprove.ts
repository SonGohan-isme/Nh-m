export class RequestClaimApprove {
    id: number;
    name: string;
    date: Date;
    code_sender: string;
    description: string;
    amount: number;
    id_contract: number;
    status: string;
    priority: string;


    constructor(id: number,
        name: string,
        date: Date,
        code_sender: string,
        description: string,
        amount: number,
        id_contract: number,
        status: string,
        priority: string) {

        this.id = id;
        this.name = name;
        this.date = date;
        this.code_sender = code_sender;
        this.description = description;
        this.amount = amount;
        this.id_contract = id_contract;
        this.status = status;
        this.priority = priority;
    }
}