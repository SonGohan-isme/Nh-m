export class PauseReason{
id:number;
description:string;
id_admin_approve:number;
id_employee_pause:number;
created_time:Date;
id_attachment:number;

constructor(
    description: string,
    id_admin_approve: number,
    id_employee_pause: number,
    created_time: Date,
    id_attachment:number
) {
    this.description = description;
    this.id_admin_approve = id_admin_approve;
    this.id_employee_pause = id_employee_pause;
    this.created_time = created_time;
    this.id_attachment = id_attachment;
}
}