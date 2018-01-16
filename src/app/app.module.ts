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
import {LobbyModule} from "./components/lobby/lobby.module";
import {GameRequestsModule} from "./components/game-requests/game-requests.module";
import {ChessModule} from "./components/chess/chess.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CheckersModule,
    ChessModule,
    HttpClientModule,
    LobbyModule,
    MessageModule,
    SignonModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
