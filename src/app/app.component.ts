import {Component, OnInit, ViewChild} from '@angular/core';
import {CheckersComponent} from "./components/checkers/checkers.component";
import {GlobalData} from "./util/types/global-data";
import {User} from "./util/types/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Game Hub';
  menuToggle = true;
  static user: User;

  ngOnInit(): void {
    // this.user = GlobalData.user;
    // console.log(this.user);
  }

  static setUser () {
    AppComponent.user = GlobalData.user;
    console.log(AppComponent.user);
  }

  toggleMenu(): void {
    this.menuToggle = !this.menuToggle;
  }
}
