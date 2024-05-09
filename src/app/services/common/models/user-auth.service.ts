import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { TokenResponse } from '../../../contracts/token/tokenResponse';
import { Observable, firstValueFrom } from 'rxjs';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService:HttpClientService,private toastrService:CustomToastrService) { }
  async login(userNameOrEmail:string,password:string,callBackFunction?:()=>void):Promise<any>{
    const observable:Observable<any>|TokenResponse= this.httpClientService.post<any |TokenResponse>({
     controller:"auth",
     action:"login"
    },{userNameOrEmail,password});
    const tokenResponse:TokenResponse=await firstValueFrom(observable) as TokenResponse;
    if(tokenResponse){
     localStorage.setItem("accessToken",tokenResponse.token.accessToken);
    this.toastrService.message("Kullanıcı girişi başarıyla sağlandı","Giriş Başarılı",{
     messageType:ToastrMessageType.Success,
     position:ToastrPosition.TopRight
    })
    }
    callBackFunction();
   }
   async googleLogin(user:SocialUser,callBackFunction?:()=>void):Promise<any>{
   const observable:Observable<SocialUser|TokenResponse>=this.httpClientService.post<SocialUser|TokenResponse>({
     controller:"auth",
     action:"google-login"
   },user);
   const tokenResponse:TokenResponse= await firstValueFrom(observable) as TokenResponse;
   if(tokenResponse){
     localStorage.setItem("accessToken",tokenResponse.token.accessToken);
     this.toastrService.message("Kullanıcı girişi google ile başarıyla sağlandı","Giriş Başarılı",{
       messageType:ToastrMessageType.Success,
       position:ToastrPosition.TopRight
     })
   }
   callBackFunction();
   }
   async facebookLogin(user:SocialUser,callBackFunction?:()=>void):Promise<any>{
    const observable:Observable<SocialUser|TokenResponse>= this.httpClientService.post<SocialUser|TokenResponse>({
       controller:"auth",
       action:"facebook-login"
     },user);
     const tokenResponse:TokenResponse=await firstValueFrom(observable)as TokenResponse;
     if(tokenResponse){
       localStorage.setItem("accessToken",tokenResponse.token.accessToken);
       this.toastrService.message("Kullanıcı girişi facebook ile başarıyla sağlandı","Giriş Başarılı",{
         messageType:ToastrMessageType.Success,
         position:ToastrPosition.TopRight
       })
     }
     callBackFunction();
   }
}
