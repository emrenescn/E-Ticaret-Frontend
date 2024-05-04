import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/ui/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { _isAuthenticated } from '../../services/common/auth.service';


export const AuthGuard: CanActivateFn = (route, state) => {
 
  const jwtHelper=inject(JwtHelperService);
const router=inject(Router);
const toastr=inject(CustomToastrService);
const spinner=inject(NgxSpinnerService);
spinner.show(SpinnerType.BallAtom);
  const token:string=localStorage.getItem("accessToken");
  //const decodeToken=jwtHelper.decodeToken(token);
  //const expirationDate:Date=jwtHelper.getTokenExpirationDate(token);
  // let expired:boolean;
  //   try{
  //     expired=jwtHelper.isTokenExpired(token);
  //   }
  //   catch{
  //    expired=true;
  //   }
  if(!_isAuthenticated){
    router.navigate(["login"],{queryParams:{returnUrl:state.url}});
    toastr.message("Oturum Açmanız Gerekiyor...","Yetkisiz Erişim!",{
      messageType:ToastrMessageType.Warning,
      position:ToastrPosition.TopRight
    })
  }
  spinner.hide(SpinnerType.BallAtom);
  return true;
};
