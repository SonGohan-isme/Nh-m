export class CustomerAcc {
     id :number;
     code :string;
     pass :string;
     status: boolean;

    constructor(id:number,code :string,pass :string,status :boolean){
        this.code = code;
        this.status = status;
        this.pass = pass;
        this.id = id;
    }

    getId(){
        return this.id;
    }

    getCode(){
        return this.code;
    }

    getPass(){
        return this.pass;
    }

    getStatus(){
        return this.status;
    }
}