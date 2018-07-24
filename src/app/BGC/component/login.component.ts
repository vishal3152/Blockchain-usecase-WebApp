import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../common/sharedservices/common.services';
import { AppGlobals } from './app.global'
import { delay } from 'rxjs/operator/delay';

@Component({
  selector: 'app-login',
  templateUrl: './login.componentview.html',
 
})
export class LoginComponent  {
   

  constructor( private _ag: AppGlobals,private router: Router) { }



  async loginUser(event) {
      try{
       
    event.preventDefault();
    const target = event.target;
    const username = target.querySelector('#username').value;
     this._ag.setUserToken(username); 
     await this.delay(300);
      }catch(error){

      }  finally{
        this.router.navigate(['/']);  
      }
  }
   delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

}