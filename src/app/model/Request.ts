export class Request{
    id:number;
    name:string;
    id_type:number;
    date:Date;
    requestcol:number;
    code_sender:string;
    code_reciever:string;
    description:string;
    priority:string;
    id_contract:number;
    status:string;

    constructor(id:number,
        name:string,
        id_type:number,
        date:Date,
        requestcol:number,
        code_sender:string,
        code_reciever:string,
        description:string,
        priority:string,
        id_contract:number,
        status:string,){

            this.id=id;
            this.name=name;
            this.id_type=id_type;
            this.date=date;
            this.requestcol=requestcol;
            this.code_sender=code_sender;
            this.code_reciever=code_reciever;
            this.description=description;
            this.priority=priority;
            this.id_contract=id_contract;
            this.status=status;

    }
}