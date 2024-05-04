import { Component } from '@angular/core';
import { AuthService } from './services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(public authService:AuthService,private toastrService:CustomToastrService){
  authService.identityCheck();
  } 
  signOut(){
  localStorage.removeItem("accessToken");
  this.authService.identityCheck();
  this.toastrService.message("Çıkış Yapıldı","Oturum Kapatıldı",{
    messageType:ToastrMessageType.Warning,
    position:ToastrPosition.TopRight
  })
  }
}
