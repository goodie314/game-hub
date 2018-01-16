import {Component, EventEmitter, Output} from "@angular/core";
import {GlobalData} from "../../util/types/global-data";
import {SignonService} from "./signon.service";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {AppComponent} from "../../app.component";
import {User} from "../../util/types/user";
import {MessageService} from "../message/message.service";

@Component({
  selector: 'signon',
  templateUrl: './signon.component.html',
  styleUrls: ['./signon.component.css']
})

export class SignonComponent {
  private username: string;
  private password: string;

  constructor (private signonService: SignonService,
               private router: Router,
               private route: ActivatedRoute,
               private messageService: MessageService) {
  }

  private signIn(): void {
    if (this.username && this.password) {
      this.signonService.signon(this.username, this.password, true)
        .subscribe((user) => {
          if (user) {
            this.signonService.signonSuccessful(user);
            this.router.navigate([''], {relativeTo: this.route});
          }
        }, (err) => {
          this.messageService.error('Sign In', 'Error signing in to account');
        });
    }
  }

  private signUp(): void {
    if (this.username && this.password) {
      this.signonService.signon(this.username, this.password, false)
        .subscribe((user) => {
          if (user) {
            this.signonService.signonSuccessful(user);
            this.router.navigate([''], {relativeTo: this.route});
          }
        }, () => {
          this.messageService.error('Sign Up', 'Error signing up for account');
        });
    }
  }
}
