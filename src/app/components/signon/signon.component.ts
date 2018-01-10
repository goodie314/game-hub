import {Component} from "@angular/core";
import {GlobalData} from "../../util/types/global-data";

@Component({
  selector: 'signon',
  templateUrl: './signon.component.html',
  styleUrls: ['./signon.component.css']
})

export class SignonComponent {
  username: string;
  password: string;

  private signin(): void {
    console.log('user name: ', this.username);
    console.log('password: ', this.password);
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
