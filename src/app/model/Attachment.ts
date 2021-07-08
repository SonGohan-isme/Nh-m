export class Attachment{
    id:number;
    url:String;
    id_attachment:number;
    name:String;

    constructor(id:number,url:String,id_attachment:number,name:String){
        this.id = id;
        this.url = url;
        this.id_attachment = id_attachment;
        this.name = name;
    }
}