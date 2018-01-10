import {NgModule} from "@angular/core";
import {SignonComponent} from "./signon.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {SignonService} from "./signon.service";

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [SignonComponent],
  providers: [SignonService],
  declarations: [SignonComponent]
})

export class SignonModule {
}
