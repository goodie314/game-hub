import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {LobbyComponent} from "./lobby.component";
import {UserAddModule} from "../user-add/user-add.module";
import {GameRequestsModule} from "../game-requests/game-requests.module";

@NgModule({
  imports: [CommonModule, FormsModule, UserAddModule, GameRequestsModule],
  exports: [LobbyComponent],
  providers: [],
  declarations: [LobbyComponent]
})

export class LobbyModule {
}
