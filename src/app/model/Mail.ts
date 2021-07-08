export class Mail {
  id : number;
  title: String;
  content: String;
  time: Date;
  name:String;
  receive_name:String
  status: String;
  priority: String;
  senderId: number;
  receiverId: number;
  code : String;

  constructor(id: number, title: String, content: String, time: Date,name:String, status: String, priority: String, senderId: number, receiverId: number,code:String){
    this.id = id;
    this.title = title;
    this.content = content;
    this.time = time;
    this.name = name;
    this.status = status;
    this.priority = priority;
    this.senderId = senderId;
    this.receiverId = receiverId;
    this.code = code;
  }
}
