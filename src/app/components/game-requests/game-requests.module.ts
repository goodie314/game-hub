import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {GameRequestsComponent} from "./game-requests.component";
import {GameRequestsService} from "./game-requests.service";

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [GameRequestsComponent],
  providers: [GameRequestsService],
  declarations: [GameRequestsComponent]
})

export class GameRequestsModule {
}
