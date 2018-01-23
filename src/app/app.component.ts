import {Component, OnInit} from '@angular/core';
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
    });
    this.user = this.signonService.getSignedInUser();
  }

  constructor(private signonService: SignonService) {
  }

  private signOut(): void {
    this.user = null;
    this.signonService.setSignedInUser(null);
  }
}
