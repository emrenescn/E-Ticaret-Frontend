import { Injectable } from '@angular/core';
declare  var alertify:any;
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }
  //messageType:MessageType,position:Position,delay:number=10,dissmissOther:boolean=true
  message(message:string,alertifyOptions:Partial<AlertifyOptions>){
    alertify.set('notifier','delay',alertifyOptions.delay);
    alertify.set('notifier','position',alertifyOptions.position);
     const msg=alertify[alertifyOptions.messageType](message);
     if(alertifyOptions.dismissOther)
     msg.dismissOther;
  }
  dismiss(){
    alertify.dismissAll();
    }
}
export class AlertifyOptions{
  messageType:MessageType=MessageType.Message;
  position:Position=Position.BottomLeft;
  delay:number=2;
  dismissOther:boolean=false;
}

export enum MessageType{
    Error="error",
    Success="success",
    Warning="warning",
    Message="message",
    Notify="notify"
}
export enum Position{
  TopCenter="top-center",
  TopLeft="top-left",
  TopRight="top-right",
  BottomCenter="bottom-center",
  BottomRight="bottom-right",
  BottomLeft="bottom-left"
}
