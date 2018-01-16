import {Component, OnInit} from "@angular/core";
import {ChessService} from "./chess.service";
import {Chess} from "../../util/types/chess/chess";
import {LocalChessPlayer} from "../../util/types/chess/local-chess-player";
import {ChessPlayer} from "../../util/types/chess/chess-player";

@Component({
  selector: 'chess',
  templateUrl: './chess.component.html',
  styleUrls: ['./chess.component.css']
})

export class ChessComponent implements OnInit {
  private chess: Chess;

  constructor(private chessService: ChessService) {
  }

  ngOnInit(): void {
    const players: ChessPlayer[] = [new LocalChessPlayer(), new LocalChessPlayer()];
    this.chess = new Chess(players);
  }
}
