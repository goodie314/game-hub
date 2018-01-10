import {NgModule} from "@angular/core";
import {SignonComponent} from "./signon.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [SignonComponent],
  providers: [],
  declarations: [SignonComponent]
})

export class SignonModule {
}
