import {Component, Input, OnInit} from "@angular/core";
import {GameRequestsService} from "./game-requests.service";
import {GameRequest} from "../../util/types/game-request";

@Component({
  selector: 'game-requests',
  templateUrl: './game-requests.component.html',
  styleUrls: ['./game-requests.component.css']
})

export class GameRequestsComponent implements OnInit{

  @Input()
  game: string;
  private activeGameRequests: GameRequest[];

  ngOnInit(): void {
    this.gameRequestsService.getGameRequests(this.game, 'matt').subscribe((request) => {
      console.log(request);
    });
  }

  constructor(private gameRequestsService: GameRequestsService) {
  }
}
