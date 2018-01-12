
import {Routes} from "@angular/router";
import {CheckersComponent} from "./components/checkers/checkers.component";
import {SignonComponent} from "./components/signon/signon.component";
import {LobbyComponent} from "./components/lobby/lobby.component";

export const routes: Routes = [
  { path: 'signon', component: SignonComponent },
  { path: ':game/lobby', component: LobbyComponent },
  { path: '', component: CheckersComponent}
];
