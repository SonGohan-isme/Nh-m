export class CustomerAttachment{
    id:number;
    name_document:string;
    url:string;
    id_customer:number;
    id_contract:number;

    constructor(
        id:number,
    name_document:string,
    url:string,
    id_customer:number,
    id_contract:number,
    ){
        this.id = id;
        this.name_document = name_document;
        this.url = url;
        this.id_customer = id_customer;
        this.id_contract = id_contract;
    }
}