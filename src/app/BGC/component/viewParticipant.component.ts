import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../common/sharedservices/common.services';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AppGlobals } from './app.global';


@Component({
    selector: 'viewparticipant-component',
    templateUrl: './viewParticipant.componentview.html'
})

export class ViewComponent implements OnInit {
    uid: string;
    por: string;
    status: string;
    enableAppSec: boolean;
    enableCustSec: boolean;
    enableContractView: boolean;
    enableMatchSec: boolean;
    _body: any;
    _bodyAsset: any;
    _bodyProposal: any[];
    response: any;
    selIndex: any;
    key: string;
    token:string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private _cs: CommonService,
        private location: Location,
        private ag: AppGlobals
    ) { }

    ngOnInit(): void {
        this.uid = this.route.snapshot.paramMap.get('uid');
        this.search(this.uid);
        console.log("/////////////////////////" + this.ag.getToken());
        if (!this.ag.getToken()) {
            this.router.navigate(['/login']);
        }
    }
    search(uid) {
        let args: string[] = [];
        args.push(this.uid);
        var fcn = "queryAssetData";
        
            this._cs.search(fcn, args,this.ag.getToken())
                .subscribe(
                    results => {
                        this.response = results;
                        console.log(this.response);
                        if (this.response.status == 200) {
                            this.status = this.response.status;
                            this._body = JSON.parse(this.response._body);
                            this.por = this._body.docType;
                            this.enableCustSec = true;

                        } else {
                            alert('Error occurred ');
                        }
                    }
                )
        
    }
    searchAssetData() {

        let args: string[] = [];
        args.push(this.uid);
        if (this.por == "BRWR") {
            args.push('BORROWER');
        } else if (this.por == "LNDR") {
            args.push('LENDER');
        }
        var fcn = "queryAssetForParticipant";
        this._cs.search(fcn, args,this.ag.getToken())
            .subscribe(
                results => {
                    this.response = results;
                    console.log(this.response);
                    if (this.response.status == 200) {
                        this.enableAppSec = true;
                        this.status = this.response.status;
                        this._bodyAsset = JSON.parse(this.response._body);
                        console.log(this._bodyAsset);
                    } else {
                        alert('Error occurred while registering');
                    }
                }
            )
    }
    executeQuery(action) {
        let args: string[] = [];
        var jsonReq={};
        var jsonReqQuer1 = {
            selector:{
               docType:"" ,
               commitAmount:{
                $gte:"",
                
               }
            }
        };
        var jsonReqQuer2 = {
            selector:{
               docType:"" ,
               
               borrowerId:{
                $eq:""                
               }
            }
        };
        var jsonReqQuer3 = {
            selector:{
               docType:"" ,
               
               lenderId:{
                $eq:""                
               }
            }
        };
       
         if(action=='match'){
         jsonReqQuer1.selector.commitAmount.$gte=this._bodyAsset.loanAmount;
         // var jsonCommit={};
          //jsonReq.selector.commitAmount=jsonCond;
        //  jsonReqQuer1.selector.commitAmount.$gte=this._bodyAsset.loanAmount;
          //jsonReq.selector=jsonCommit;
          jsonReqQuer1.selector.docType="LEPRPL";
          jsonReq=jsonReqQuer1;
          }else{
              //jsonCond.$eq=this.uid;
             // var jsonCommit={};
              if(this.por=="BRWR"){
                jsonReqQuer2.selector.borrowerId.$eq=this.uid;
                jsonReqQuer2.selector.docType="CONTRACT";
                jsonReq=jsonReqQuer2;
          }
              else{
                jsonReqQuer3.selector.lenderId.$eq=this.uid;
                jsonReqQuer3.selector.docType="CONTRACT";
                jsonReq=jsonReqQuer3;
              }
              
             // jsonReq.selector=jsonCommit;
          }
        console.log(jsonReq);
        args.push(JSON.stringify(jsonReq));
        var fcn = "getQueryResult";
        this._cs.search(fcn, args,this.ag.getToken())
            .subscribe(
                results => {
                    this.response = results;
                    console.log(this.response);
                    if (this.response.status == 200) {
                        this.status = this.response.status;
                        this._bodyProposal = JSON.parse(this.response._body);
                       // console.log(this._bodyProposal[0].Record.commitAmount);
                        if (action == "match") {
                            this.enableMatchSec = true;
                        } else {
                            this.enableContractView = true;
                        }

                    } else {
                        alert('Error occurred while registering');
                    }
                }
            )
    }

    setClickedRow(index) {
        this.selIndex = index;
        // alert(this._bodyProposal[index].Record.proposalId);
    }
    executeContrat() {

        let args: string[] = [];
        // args.push(this.uid);

        var fcn = "registerContract";
        args.push(this._bodyAsset.applId); args.push(this._body.identityNo);
        args.push(this._bodyProposal[this.selIndex].Record.proposalId); args.push(this._bodyProposal[this.selIndex].Record.lenderId);
        args.push(String(this._bodyAsset.loanAmount)); args.push(String(this._bodyProposal[this.selIndex].Record.intRate));
        args.push(String(this._bodyProposal[this.selIndex].Record.intRate));

        this._cs.addParticipant(fcn, args,this.ag.getToken())
            .subscribe(
                results => {
                    this.response = results;
                    console.log(this.response);
                    if (this.response.status == 200) {
                        this.status = this.response.status;
                        var _body = JSON.parse(this.response._body);
                        this.key = _body.key;
                        alert('Submission was successful:' + _body.key);
                        this.enableMatchSec = false;
                        this.executeQuery('d');
                        this.enableContractView = true;
                    } else {
                        alert('Error occurred while registering');
                    }
                }
            )

    }
}
