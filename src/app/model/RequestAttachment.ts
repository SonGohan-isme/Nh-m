export class RequestAttachment{
    id:number;
    name_document:string;
    url:string;
    id_request:number;

    constructor(
        id:number,
    name_document:string,
    url:string,
    id_request:number,
    ){
        this.id = id;
        this.name_document = name_document;
        this.url = url;
        this.id_request = id_request;
    }
}