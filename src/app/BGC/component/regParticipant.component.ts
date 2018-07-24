//
import { Component, OnInit } from '@angular/core';
import { Participant } from '../model/emp.model';
import { Observable } from 'rxjs/Rx';
import { CommonService } from '../../common/sharedservices/common.services';
import { AppGlobals } from './app.global';
import { Router } from '@angular/router';

@Component({
    selector: 'regparticipant-component',
    templateUrl: './regParticipant.componentview.html'
})

export class AddParticipantComponent implements OnInit {
  
    resp: string;
    response: any;
    fcn:string;
    status:number;
  
    prt = new Participant("", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "");

    constructor(
        private _cs: CommonService,private ag:AppGlobals,private router:Router
    ) {}

    ngOnInit(): void {
        if (!this.ag.getToken()) {
            this.router.navigate(['/login']);
        }
    }

    regParticipant() {    
        let args: string[] = [];
        if(this.prt.por=='LNDR'){
            this.fcn='registerLender';
            args.push(this.prt.uid);args.push(this.prt.fName+' '+this.prt.lName);
            args.push(this.prt.dob);args.push(this.prt.maritialStatus);
            args.push(this.prt.accountNumber);args.push(this.prt.accountBal);
            args.push(this.prt.zip);args.push(this.prt.addrLine);
            args.push(this.prt.city);args.push(this.prt.province);
            args.push(this.prt.phone);args.push(this.prt.countryCode);
        }
        else{
            this.fcn='registerBorrower';
            args.push(this.prt.uid);args.push(this.prt.fName+' '+this.prt.lName);
            args.push(this.prt.dob);args.push(this.prt.maritialStatus);
            args.push(this.prt.countryCode);args.push(this.prt.zip);
            args.push(this.prt.addrLine);
            args.push(this.prt.city);args.push(this.prt.province);
            args.push(this.prt.phone);
        }
        this._cs.addParticipant(this.fcn,args,this.ag.getToken())
            .subscribe(
            results => {
                this.response = results;
                console.log(this.response);
                if(this.response.status==200){
                    this.status=this.response.status;
                    alert (this.prt.uid +' registered successfully');
                }else{
                    alert (this.prt.uid +' : error occurred while registering'); 
                }
            }
            )
    }
}
