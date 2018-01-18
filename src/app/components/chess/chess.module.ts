import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ChessComponent} from "./chess.component";
import {ConfirmModule} from "../confirm/confirm.module";

@NgModule({
  imports: [CommonModule, FormsModule, ConfirmModule],
  exports: [ChessComponent],
  declarations: [ChessComponent],
  providers: []
})

export class ChessModule {
}
