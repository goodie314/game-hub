import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MessageService} from "./message.service";
import {MessageComponent} from "./message.component";

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [MessageComponent],
  providers: [MessageService],
  declarations: [MessageComponent]
})

export class MessageModule {
}
