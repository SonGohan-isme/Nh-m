export class EmployeeAcc{
    id:number;
    code:string;
    pass:string;
    id_role:number;
    status:boolean;


    constructor(code :string,pass :string,id_role :number,status : boolean){
        this.code = code;
        this.pass = pass;
        this.id_role = id_role;
        this.status = status;
    }
    getCode(){
        return this.code;
    }

    getPass(){
        return this.pass;
    }

    getRole(){
        return this.id_role;
    }
    getStatus(){
        return this.status;
    }
}