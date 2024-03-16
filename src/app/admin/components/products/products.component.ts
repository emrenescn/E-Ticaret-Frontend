import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClientService } from '../../../services/common/http-client.service';
import { response } from 'express';
import { ListComponent } from './list/list.component';
import { Create_Product } from '../../../contracts/create_product';


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
  }
  @ViewChild(ListComponent)listComponents:ListComponent;
  createdProduct(createdProduct:Create_Product){
  this.listComponents.getProducts();
  }

}
