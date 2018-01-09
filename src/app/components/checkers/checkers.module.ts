import {NgModule} from "@angular/core";
import {CheckersComponent} from "./checkers.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [CheckersComponent],
  declarations: [CheckersComponent],
  providers: []
})

export class CheckersModule {
}
