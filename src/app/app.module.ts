import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {CheckersModule} from "./components/checkers/checkers.module";
import {RouterModule} from "@angular/router";
import {routes} from "./routes";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CheckersModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
