import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../common/sharedservices/common.services';
import { Router } from '@angular/router';
import { AppGlobals } from './app.global';

@Component({
    selector: 'search-component',
    templateUrl: './search.componentview.html'
})

export class SearchComponent implements OnInit{
   
    uid: string;
    key: string;
   // asset = new Asset("", "", "", "", "", "", "", "");

    constructor(  private router: Router,
        private ag:AppGlobals 
    ) { }

    ngOnInit(): void {
        
        console.log("/////////////////////////"+this.ag.getToken());
        if(!this.ag.getToken()){
        this.router.navigate(['/login']);  
        }
    }
}
