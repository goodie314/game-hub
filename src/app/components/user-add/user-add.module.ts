import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {UserAddComponent} from "./user-add.component";
import {UserAddService} from "./user-add.service";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [UserAddComponent],
  providers: [UserAddService],
  declarations: [UserAddComponent]
})

export class UserAddModule {
}
