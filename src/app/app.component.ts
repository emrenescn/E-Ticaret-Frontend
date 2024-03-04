import { Component } from '@angular/core';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ETicaretClient';
  constructor(private toastr:CustomToastrService){
    this.toastr.message("as","sa",{
      messageType:ToastrMessageType.Info,
      position:ToastrPosition.BottomFullWidth
    });
    
   
  }

}
