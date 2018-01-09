import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ConfirmComponent} from "./confirm.component";

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [ConfirmComponent],
  providers: [],
  declarations: [ConfirmComponent]
})

export class ConfirmModule {
}
