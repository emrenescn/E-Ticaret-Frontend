import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';
import { UserAuthService } from './models/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor{
  constructor(private toastrService:CustomToastrService,private userAuthService:UserAuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error=>{
      switch(error.status){
        case HttpStatusCode.Unauthorized:
          this.toastrService.message("Bu işlemi yapmak için yetkiniz bulunmamaktadır!","Yetkisiz Erişim!",{
            position:ToastrPosition.BottomCenter,
            messageType:ToastrMessageType.Warning
          })
          this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken")).then(data=>{
          });
        break;
        case HttpStatusCode.InternalServerError:
          this.toastrService.message("Sunucuya erişilemiyor","Sunucu Hatası!",{
            position:ToastrPosition.TopRight,
            messageType:ToastrMessageType.Warning
          })
        break;
        case HttpStatusCode.BadRequest:
          this.toastrService.message("Geçersiz istek yapıldı!","Geçersiz istek!",{
            position:ToastrPosition.TopRight,
            messageType:ToastrMessageType.Warning
          })
        break;
        case HttpStatusCode.NotFound:
          this.toastrService.message("Sayfa Bulunamadı","Sayfa Bulunamadı!",{
            position:ToastrPosition.TopRight,
            messageType:ToastrMessageType.Error
          })
        break;
        default:
          this.toastrService.message("Beklenmeyen bir hata oluştu","Beklenmeyen Hata!",{
            position:ToastrPosition.TopRight,
            messageType:ToastrMessageType.Error
          })
          break;
      }
      return of(error);
    }))
  }
}
