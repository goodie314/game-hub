import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {CheckersModule} from "./components/checkers/checkers.module";
import {RouterModule} from "@angular/router";
import {routes} from "./routes";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SignonModule} from "./components/signon/signon.module";
import {HttpClientModule} from "@angular/common/http";
import {MessageModule} from "./components/message/message.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CheckersModule,
    HttpClientModule,
    MessageModule,
    SignonModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
