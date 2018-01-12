import {Component, OnInit, ViewChild} from '@angular/core';
import {CheckersComponent} from "./components/checkers/checkers.component";
import {GlobalData} from "./util/types/global-data";
import {User} from "./util/types/user";
import {SignonService} from "./components/signon/signon.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private title = 'Game Hub';
  private user: User;

  ngOnInit(): void {
    this.signonService.getSignonEvent().subscribe((user) => {
      this.user = user;
      console.log('user changed to: ', user);
    })
  }

  constructor(private signonService: SignonService) {
  }
}
