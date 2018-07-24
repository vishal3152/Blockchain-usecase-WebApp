
import { Component } from '@angular/core';
import { ChatService } from './common/sharedservices/connect.ws.service';

@Component({
  selector: 'app-root',
  templateUrl:'./app.component.html',

})
export class AppComponent  { 
  name = 'Angular'; 
 
constructor() {
}
}



// // template: `<dashboard-component></dashboard-component>`,