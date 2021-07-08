export class SigInData{
     code: string;
     pass: string;

    constructor(code:string, pass:string){
        this.code = code;
        this.pass = pass;
    }

    getCode(): string {
        return this.code;
    }

    getPass(): string {
        return this.pass;
    }
}