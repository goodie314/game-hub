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
import {ChessModule} from "./components/chess/chess.module";
import {GamesService} from "./util/services/games.service";
import {PongModule} from "./components/pong/pong.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CheckersModule,
    ChessModule,
    PongModule,
    HttpClientModule,
    LobbyModule,
    MessageModule,
    SignonModule,
    RouterModule.forRoot(routes)
  ],
  providers: [GamesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
