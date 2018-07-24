import { Injectable } from '@angular/core';
import { CommonService } from '../../common/sharedservices/common.services';


@Injectable()
export class AppGlobals {
    constructor(private cs:CommonService){}
    //readonly baseAppUrl: string = 'http://localhost:57431/';
    //readonly baseAPIUrl: string = 'https://api.github.com/';
    accessString:string;
    response:any
    _body: any;
    
    getToken():string{
       
        return this.accessString;
    }
    clearToken(){
       
       this.accessString=null;
    }
    setUserToken(user){
        this.cs.registerUser(user)
        .subscribe(
            results => {
                this.response = results;
                
                if (this.response.status == 200) {
                    this._body = JSON.parse(this.response._body);
                    this.accessString = this._body.token;
                    console.log(this.accessString);
                } else {
                    alert('Error occurred while registering');
                }
            }
        )
        
    }

}