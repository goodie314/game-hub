import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {GameRequestsService} from "./game-requests.service";
import {GameRequest} from "../../util/types/game-request";
import {SignonService} from "../signon/signon.service";
import {User} from "../../util/types/user";

@Component({
  selector: 'game-requests',
  templateUrl: './game-requests.component.html',
  styleUrls: ['./game-requests.component.css']
})

export class GameRequestsComponent implements OnInit, OnDestroy {
  @Input()
  game: string;
  private user: User;
  private activeGameRequests: GameRequest[] = [];
  private requestInterval;

  ngOnInit(): void {
    this.user = this.signonService.getSignedInUser();
    this.getGameRequests();
    this.requestInterval = window.setInterval(() => {
      this.getGameRequests();
    }, 5000);
  }

  ngOnDestroy(): void {
    window.clearInterval(this.requestInterval);
  }

  constructor(private gameRequestsService: GameRequestsService,
              private signonService: SignonService) {
  }

  private getGameRequests(): void {
    this.gameRequestsService.getGameRequests(this.game, this.user.userName).subscribe((requests) => {
      this.activeGameRequests.push(...requests.filter((request) => {
        for (const existingRequest of this.activeGameRequests) {
          if (existingRequest.creationDate === request.creationDate) {
            return false;
          }
        }
        return true;
      }));
      // this.activeGameRequests.push(...requests);
    });
  }
}
