export class CustomerNotification {
    id: number;
    id_customer: number;
    title: string;
    description: string;
    url: string;
    type: number;
    date: Date;

    constructor(id: number,
        id_customer: number,
        title: string,
        description: string,
        url: string,
        type: number,
        date: Date) {

        this.id = id;
        this.id_customer = id_customer;
        this.title = title;
        this.description = description;
        this.url = url;
        this.type = type;
        this.date = date;
    }
}