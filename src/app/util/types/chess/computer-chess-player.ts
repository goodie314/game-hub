import {ChessPlayer} from "./chess-player";
import {Shade} from "../../enums/shade";
import {Chess} from "./chess";
import {ChessMove} from "./chess-move";

export class ComputerChessPlayer extends ChessPlayer {

  constructor(shade: Shade) {
    super(shade);
  }

  public yourTurn(chess: Chess) {
    super.yourTurn(chess);
    const move = this.calculateMove();
    window.setTimeout(() => {
      this.takeTurn(move);
    }, 100);
  }

  private calculateMove(): ChessMove {
    for (const move of this.potentialMoves) {
      if (move.capturedPiece) {
        return move;
      }
    }

    return this.potentialMoves[Math.floor(Math.random() * this.potentialMoves.length)];
  }
}
