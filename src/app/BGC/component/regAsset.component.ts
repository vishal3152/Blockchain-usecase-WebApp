import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CommonService } from '../../common/sharedservices/common.services';
import { ActivatedRoute } from '@angular/router';
import { Asset } from '../model/asset.model';
import {  Router } from '@angular/router';
import { AppGlobals } from './app.global';

@Component({
    selector: 'regasset-component',
    templateUrl: './regAsset.componentview.html'
})

export class RegisterAssetComponent implements OnInit {
    por: string;
    uid: string;
    key: string;
    assetType: string;
    status:number;
    token:string
    response: any;
    asset = new Asset("", "", "", "", "", "", "", "","");

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private _cs: CommonService,
        private ag: AppGlobals,
        private location: Location
    ) {

    }
    ngOnInit() {
        this.uid = this.route.snapshot.paramMap.get('borrowerId');
        this.por = this.route.snapshot.paramMap.get('por');
        if (!this.ag.getToken()) {
            this.router.navigate(['/login']);
        }

        if (this.por == 'LNDR') {
            this.assetType = 'Lending proposal';
        } else {
            this.assetType = 'Loan application';
        }
    }
    //	loanAppl := LoanApplication{ObjectType: "LAPL", BorrowerId: args[0], LoanAmount: loanAmount, LoanCurrency: args[2], Status: "APPLIED", AppliedDate: time.Now(), ApplId: applId}
    //	lendingProposal := LendingProposal{ObjectType: "LEPRPL", LenderId: args[0], CommitAmount: commitAmount, RemAmount: remAmount, IntRate: intRate, LoanCurrency: args[4], Status: "PROPOSED", RegDate: time.Now(), ProposalId: proposalId}


    addAsset() {
        let args: string[] = [];
        args.push(this.uid);
        var fcn = "submitLendingProposal";
        if (this.por == 'BRWR') {
            fcn = "submitLoanApplication";
            args.push(this.asset.loanAmount); args.push(this.asset.loanCurrency);
        } else {
            args.push(this.asset.commitAmount); args.push(this.asset.remAMount);
            args.push(this.asset.intRate); args.push(this.asset.loanCurrency);
        }
        this._cs.addParticipant(fcn, args,this.ag.getToken())
            .subscribe(
                results => {
                    this.response = results;
                    console.log(this.response);
                    if (this.response.status == 200) {
                        this.status=this.response.status;
                        var _body = JSON.parse(this.response._body);
                        this.key = _body.key;
                        alert('Submission was successful:' + _body.key);
                    } else {
                        alert('Error occurred while registering');
                    }
                }
            )
    }
}
