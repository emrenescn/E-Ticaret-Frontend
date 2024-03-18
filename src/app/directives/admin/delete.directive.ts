import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from '../../dialogs/delete-dialog/delete-dialog.component';
import { HttpClientService } from '../../services/common/http-client.service';
import { AlertifyService, MessageType, Position } from '../../services/admin/alertify.service';
import { HttpErrorResponse } from '@angular/common/http';
declare var $:any;
@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(private element:ElementRef,private _renderer:Renderer2,private httpClientService:HttpClientService,
    private spinnerService:NgxSpinnerService,public dialog: MatDialog,private alertifyService:AlertifyService) { 
    const img=_renderer.createElement("img");
    img.setAttribute("src","../../../../../assets/delete.png");
    img.setAttribute("style","cursor:pointer;");
    img.width=20;
    img.height=20;
    _renderer.appendChild(element.nativeElement,img);
  }

  @Input() id:string;
  @Input() controller:string;
  @Output() callBack:EventEmitter<any>=new EventEmitter();
  @HostListener("click")
  async onClick(){
    this.openDialog(async()=>{
      this.spinnerService.show(SpinnerType.BallAtom);
      const td:HTMLTableCellElement=this.element.nativeElement;
     await this.httpClientService.delete({
      controller:this.controller
     },this.id).subscribe(data=>{
      $(td.parentElement).animate({
        opacity:0,
        left:"+=50",
        height:"toogle"
      },700,()=>{
        this.callBack.emit();
        this.alertifyService.message("Silme işlemi başarılı",{
          messageType:MessageType.Success,
          position:Position.TopRight,
          dismissOther:true,
          delay:2
        })
      })
     },(errorResponse:HttpErrorResponse)=>{
      this.alertifyService.message("Silme başarısız",{
        dismissOther:true,
        position:Position.TopRight,
        messageType:MessageType.Error,
        delay:2
      })
     })
    })
  }

  openDialog(afterClosed:any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width:'250px',
      data:DeleteState.Yes
    });
    dialogRef.afterClosed().subscribe(result => {
     if(result==DeleteState.Yes){
      afterClosed();
     }
    });
  }
}
