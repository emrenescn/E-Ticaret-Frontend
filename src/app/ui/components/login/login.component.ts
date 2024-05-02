import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/common/models/user.service';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends BaseComponent implements OnInit{
constructor(spinner:NgxSpinnerService,private userService:UserService){
  super(spinner);
}
  ngOnInit() {
  }

  async login(userNameOrEmail:string,password:string)
  {
    this.showSpinner(SpinnerType.BallAtom);
   await  this.userService.login(userNameOrEmail,password,()=>this.hideSpinner(SpinnerType.BallAtom));
  }
}
