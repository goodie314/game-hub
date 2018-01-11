import {Component} from "@angular/core";
import {GlobalData} from "../../util/types/global-data";
import {SignonService} from "./signon.service";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {AppComponent} from "../../app.component";

@Component({
  selector: 'signon',
  templateUrl: './signon.component.html',
  styleUrls: ['./signon.component.css']
})

export class SignonComponent {
  username: string;
  password: string;

  constructor (private signonService: SignonService,
               private router: Router,
               private route: ActivatedRoute) {
  }

  private signIn(): void {
    if (this.username && this.password) {
      this.signonService.signon(this.username, this.password, true)
        .subscribe((user) => {
          if (user) {
            GlobalData.user = user;
            AppComponent.setUser();
            this.router.navigate([''], {relativeTo: this.route});
          }
        });
    }
  }

  private signUp(): void {
    if (this.username && this.password) {
      this.signonService.signon(this.username, this.password, false)
        .subscribe((user) => {
          if (user) {
            GlobalData.user = user;
            this.router.navigate([''], {relativeTo: this.route});
          }
        })
    }
  }
}
