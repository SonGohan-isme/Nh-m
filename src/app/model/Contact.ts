export class Contact {
    id: number;
    name: string;
    phone: string;
    id_province: number;
    id_district: number;
    question: string;

    constructor(id: number, name: string, phone: string, id_province: number, id_district: number, question: string) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.id_province = id_province;
        this.id_district = id_district;
        this.question = question;
    }
}