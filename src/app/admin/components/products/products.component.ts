import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClientService } from '../../../services/common/http-client.service';
import { response } from 'express';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent extends BaseComponent implements OnInit {
  
  constructor(spinner:NgxSpinnerService,private httpClientService:HttpClientService) {
    super(spinner);  
  }
  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallAtom);
    // this.httpClientService.get<Product[]>({
    //   controller:"products"
    // }).subscribe(data=>{
    //  console.log(data);
    // });
    // this.httpClientService.post({controller:"products"},{
    //   name:"Kalem",
    //   stock:100,
    //   price:15
    // }).subscribe();
    // this.httpClientService.put({controller:"products"},{
    //   id:"538f2fa6-639c-46c2-bb55-de518e778544",
    //   name:"Tükenmez Kalem",
    //   price:30,
    //   stock:90
    // }).subscribe();
    // 
    
  
  }

}
