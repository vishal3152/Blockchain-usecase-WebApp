//
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AppGlobals } from './app.global';
import { Router } from '@angular/router';

@Component({
    selector: 'welcome-component',
    templateUrl: './welcome.componentview.html'
})

export class WelcomeComponent implements OnInit {
  
    constructor(
        private ag:AppGlobals,private router:Router
    ) {

    }
    ngOnInit(): void {
        console.log(this.ag.getToken());
        if (!this.ag.getToken()) {
            this.router.navigate(['/login']);
        }
    }
}
