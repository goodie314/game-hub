import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {GameRequestsService} from "./game-requests.service";
import {GameRequest} from "../../util/types/game-request";
import {SignonService} from "../signon/signon.service";
import {User} from "../../util/types/user";
import {ActivatedRoute, Router} from "@angular/router";
import {Game} from "../../util/types/game";

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
  private activeGames: Game[] = [];

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
              private signonService: SignonService,
              private router: Router,
              private route: ActivatedRoute) {
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
    });
    this.gameRequestsService.getActiveGames(this.game, this.signonService.getSignedInUser().userName).subscribe(games => {
      if (games) {
        this.activeGames.push(...games.filter((game) => {
          for (const g of this.activeGames) {
            if (g.gameId === game.gameId) {
              return false;
            }
          }
          return true;
        }));
      }
    });
  }

  private acceptRequest(request: GameRequest): void {
    this.gameRequestsService.acceptRequest(request).subscribe(game => {
      if (game) {
        this.router.navigate(['..', game.gameId], {relativeTo: this.route});
      }
    });
  }

  private declineRequest(request: GameRequest): void {
    this.gameRequestsService.declineRequest(request);
    this.activeGameRequests = this.activeGameRequests.filter((r) => {
      return r.gameRequestId !== request.gameRequestId;
    });
  }

  private openGame(game: Game): void {
    this.router.navigate(['..', game.gameId], {relativeTo: this.route});
  }

  private deleteGame(game: Game): void {
    this.gameRequestsService.deleteGame(game);
    this.activeGames = this.activeGames.filter((g) => {
      return g.gameId !== game.gameId;
    });
  }
}
