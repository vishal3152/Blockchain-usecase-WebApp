import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TransactionHistoryComponent } from '../component/txnhistory.component';
import { WelcomeComponent } from '../component/welcome.component';
import { AddParticipantComponent } from '../component/regParticipant.component';
import { RegisterAssetComponent } from '../component/regAsset.component';
import { SearchComponent } from '../component/search.component';
import { ViewComponent } from '../component/viewParticipant.component';
import { LoginComponent } from '../component/login.component';



const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'view/:uid', component: ViewComponent },
  { path: 'searchHistory/:assetId', component: TransactionHistoryComponent },
  { path: 'addParticipant', component: AddParticipantComponent },
  { path: 'regAsset/:por/:borrowerId', component: RegisterAssetComponent },
  { path: 'search', component: SearchComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }