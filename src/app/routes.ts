
import {Routes} from "@angular/router";
import {CheckersComponent} from "./components/checkers/checkers.component";
import {SignonComponent} from "./components/signon/signon.component";

export const routes: Routes = [
  { path: 'signon', component: SignonComponent },
  { path: '', component: CheckersComponent}
];
