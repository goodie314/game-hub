import {NgModule} from "@angular/core";
import {CheckersComponent} from "./checkers.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ConfirmModule} from "../confirm/confirm.module";
import {UserAddModule} from "../user-add/user-add.module";
import {MessageModule} from "../message/message.module";
import {CheckersService} from "./checkers.service";
import {Board} from "../../drawable/checkers/board";

@NgModule({
  imports: [CommonModule, FormsModule, ConfirmModule, UserAddModule, MessageModule],
  exports: [CheckersComponent],
  declarations: [CheckersComponent],
  providers: [CheckersService]
})

export class CheckersModule {
}
