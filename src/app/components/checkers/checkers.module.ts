import {NgModule} from "@angular/core";
import {CheckersComponent} from "./checkers.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ConfirmModule} from "../confirm/confirm.module";

@NgModule({
  imports: [CommonModule, FormsModule, ConfirmModule],
  exports: [CheckersComponent],
  declarations: [CheckersComponent],
  providers: []
})

export class CheckersModule {
}
