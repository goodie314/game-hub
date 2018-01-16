import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ChessComponent} from "./chess.component";
import {ChessService} from "./chess.service";

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [ChessComponent],
  declarations: [ChessComponent],
  providers: [ChessService]
})

export class ChessModule {
}
