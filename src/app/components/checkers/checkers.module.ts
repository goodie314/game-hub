import {NgModule} from "@angular/core";
import {CheckersComponent} from "./checkers.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ConfirmModule} from "../confirm/confirm.module";
import {UserAddModule} from "../user-add/user-add.module";

@NgModule({
  imports: [CommonModule, FormsModule, ConfirmModule, UserAddModule],
  exports: [CheckersComponent],
  declarations: [CheckersComponent],
  providers: []
})

export class CheckersModule {
}
