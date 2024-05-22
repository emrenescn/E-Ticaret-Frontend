import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  constructor() { }
  private _connnection:HubConnection;
  get connection():HubConnection{
      return this._connnection;
  }
  start(hubUrl:string){
    if(!this.connection || this.connection?.state==HubConnectionState.Disconnected){
      const builder:HubConnectionBuilder=new HubConnectionBuilder();
      const hubConnection:HubConnection=builder.withUrl(hubUrl).withAutomaticReconnect().build();
      hubConnection.start()
      .then(()=>{
        console.log("Connected");
      })
        .catch(error=>setTimeout(()=>this.start(hubUrl),2000));
        this._connnection=hubConnection;
    }
    this._connnection.onreconnected(connectionId=>console.log("Reconnected"));
    this._connnection.onreconnecting(error=>console.log("Reconnecting"));
    this._connnection.onclose(error=>console.log("Close reconnection"));
  }
  invoke(procedureName:string,message:any,succesCallBack?:(value)=>void,errorCallBack?:(error)=>void){
  this.connection.invoke(procedureName,message)
  .then(succesCallBack)
  .catch(errorCallBack);
  }
  on(procedureName:string,callBack:(...message:any)=>void){
    this.connection.on(procedureName,callBack);
  }
}
