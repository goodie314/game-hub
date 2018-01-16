import {Component, Input, OnInit} from "@angular/core";
import {User} from "../../util/types/user";
import {UserAddService} from "./user-add.service";
import {MessageService} from "../message/message.service";
import {GameRequest} from "../../util/types/game-request";
import {SignonService} from "../signon/signon.service";

@Component({
  selector: 'user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})

export class UserAddComponent implements OnInit {
  @Input()
  game: string;
  users: User[] = [];
  searchText: string;

  constructor(private userAddService: UserAddService,
              private messageService: MessageService,
              private signonService: SignonService) {
  }

  ngOnInit(): void {
    const user = this.signonService.getSignedInUser();
    this.userAddService.getUsers()
      .subscribe((users) => {
        this.users = users.filter((u) => {
          return u.userName !== user.userName;
        });
      });
  }

  submit(): void {
    const user = this.signonService.getSignedInUser();
    const invitees = [this.searchText].filter((invitee) => {
      return user.userName !== invitee;
    });
    if (!invitees.length) {
      return;
    }
    const gameRequest: GameRequest = {
      gameRequestId: null,
      game: this.game,
      requester: user.userName,
      invitees: invitees,
      creationDate: new Date()
    };
    this.userAddService.makeRequest(gameRequest).subscribe(() => {
    });
  }
}
