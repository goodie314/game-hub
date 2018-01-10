import {Component} from "@angular/core";
import {GlobalData} from "../../util/types/global-data";
import {SignonService} from "./signon.service";

@Component({
  selector: 'signon',
  templateUrl: './signon.component.html',
  styleUrls: ['./signon.component.css']
})

export class SignonComponent {
  username: string;
  password: string;

  constructor (private signonService: SignonService) {
  }

  private signin(): void {
    console.log('user name: ', this.username);
    console.log('password: ', this.password);
    this.signonService.signon(this.username, this.password);
    GlobalData.user = {
      userName: this.username,
      firstName: null,
      lastName: null,
      activeGames: []
    }
  }

  private signup(): void {

  }
}