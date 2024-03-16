import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from '../../../contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Product } from '../../../contracts/list-product';
import { Observable, firstValueFrom } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService:HttpClientService) { }
  create(product:Create_Product,successCallBack?:()=>void,errorCallBack?:(errorMessage?:string)=>void){
    this.httpClientService.post({
      controller:"products"
    },product).subscribe(result=>{
      successCallBack();
    },(errorResponse:HttpErrorResponse)=>{
      const _error:Array<{key:string, value:Array<string>}>=errorResponse.error;
      let message="";
      for(let key in _error){
        let value=_error[key];
        message+=`${value}<br>`;
      }
      errorCallBack(message);
      }); 
    }
     async read(page:number=0,size:number=5,successCallBack?:()=>void,errorCallBack?:(errorMessage?:string)=>void):Promise<{totalCount:number; products:List_Product[]}>{
       const promiseData:Promise<{totalCount:number;products:List_Product[]}>= this.httpClientService.get<{totalCount:number;products:List_Product[]}>({
        controller:"products",
        queryString:`page=${page}&size=${size}`
        
       }).toPromise();
       promiseData.then(d=>successCallBack())
       .catch((errorResponse:HttpErrorResponse)=>errorCallBack(errorResponse.message));
       return await  promiseData;
    }
    async delete(id:string){
      const deleteObservable:Observable<any>=this.httpClientService.delete<any>({
        controller:"products",
      },id);
      await firstValueFrom(deleteObservable);
    }

  }

