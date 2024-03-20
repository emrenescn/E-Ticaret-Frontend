import { Component, Input } from '@angular/core';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpHeaders } from '@angular/common/http';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadDialogComponent, FileUploadState } from '../../../dialogs/file-upload-dialog/file-upload-dialog.component';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  constructor(private httpClientService:HttpClientService,private alertifyService:AlertifyService,
  private customToastrService:CustomToastrService,
  private dialog:MatDialog,
  private dialogService:DialogService){}
  public files: NgxFileDropEntry[];
  @Input() options:Partial<FileUploadOptions>;
  public selectedFiles(files: NgxFileDropEntry[]){
    this.files = files;
    const fileData:FormData=new FormData();
    for(const file of files){
      (file.fileEntry as FileSystemFileEntry).file((_file:File)=>{
        fileData.append(_file.name,_file,file.relativePath);
      })
    }
    this.dialogService.openDialog({
      componentType:FileUploadDialogComponent,
      data:FileUploadState.Yes,
      afterClosed:()=>{
        this.httpClientService.post({
          controller:this.options.controller,
          action:this.options.action,
          queryString:this.options.queryString,
          headers:new HttpHeaders({"responseType":"blob"})
        },fileData).subscribe(data=>{
          const succesFileUploadMessage:string="Dosya başarıyla yüklendi";
          
          if(this.options.isAdminPage){
             this.alertifyService.message(succesFileUploadMessage,{
              dismissOther:true,
              position:Position.TopRight,
              messageType:MessageType.Success,
              delay:2
             })
          }
          else{
             this.customToastrService.message(succesFileUploadMessage,"Başarılı",{
              messageType:ToastrMessageType.Success,
              position:ToastrPosition.TopRight
             })
          }
        },(errorResponse)=>{
          const errorFileUploadMessage:string="Dosya  yüklenemedi";
          
          if(this.options.isAdminPage){
            this.alertifyService.message(errorFileUploadMessage,{
              position:Position.TopRight,
              messageType:MessageType.Error,
              dismissOther:true,
              delay:2
            })
          }
          else{
           this.customToastrService.message(errorFileUploadMessage,"Hata",{
            position:ToastrPosition.TopRight,
            messageType:ToastrMessageType.Error
           })
          }
        });
      }
      
    })
    }
  }
  export class FileUploadOptions{
    controller?:string;
    action?:string;
    queryString?:string;
    explanation?:string;
    accept?:string;
    isAdminPage?:boolean=false;
  }


