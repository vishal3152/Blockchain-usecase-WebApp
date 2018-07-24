import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from  '@angular/forms';
import { AppComponent }  from './app.component';
import { CommonService } from './common/sharedservices/common.services';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './BGC/route/route.module';
import { TransactionHistoryComponent } from './BGC/component/txnhistory.component';
import { WelcomeComponent } from './BGC/component/welcome.component';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from './common/sharedservices/websocket.services';
import { ChatService } from './common/sharedservices/connect.ws.service';
import { AddParticipantComponent } from './BGC/component/regParticipant.component';
import { RegisterAssetComponent } from './BGC/component/regAsset.component';
import { SearchComponent } from './BGC/component/search.component';
import { ViewComponent } from './BGC/component/viewParticipant.component';
import { AppGlobals } from './BGC/component/app.global';
import { LoginComponent } from './BGC/component/login.component';

@NgModule({
  imports:      [ BrowserModule,FormsModule,HttpModule,AppRoutingModule],
  declarations: [ LoginComponent,SearchComponent,RegisterAssetComponent,AppComponent,AddParticipantComponent,ViewComponent,TransactionHistoryComponent,WelcomeComponent],
  bootstrap:    [ AppComponent ],
  providers:[CommonService,WebsocketService, ChatService,AppGlobals ]
})
export class AppModule { }