import { Benifit } from "./Benifit";

export class RelatedPerson{
    id:number;
 full_name:string;
 relation:string;
 date_of_birth:Date;
 gender:boolean;
 carreer_group:number;
 listSubBenifit:Array<Benifit>;

    constructor(id:number,
        full_name:string,
        relation:string,
        date_of_birth:Date,
        gender:boolean,
        carreer_group:number,
        listSubBenifit:Array<Benifit>){
            this.full_name = full_name;
            this.relation = relation;
            this.date_of_birth = date_of_birth;
            this.gender = gender;
            this.carreer_group = carreer_group;
            this.listSubBenifit = listSubBenifit;
    }
}