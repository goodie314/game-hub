import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {PongComponent} from "./pong.component";
@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [PongComponent],
  declarations: [PongComponent],
  providers: []
})

export class PongModule {
}
