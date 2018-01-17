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
    this.takeTurn(move);
  }

  private calculateMove(): ChessMove {
    const myPieces = this.chess.getChessPieces().filter(piece => {
      return piece.getShade() === this.shade;
    });

    const moves: ChessMove[] = [];
    myPieces.forEach(piece => {
      moves.push(...piece.getPotentialMoves(this.chess));
    });
    for (const move of moves) {
      if (move.capturedPiece) {
        return move;
      }
    }

    return moves[Math.floor(Math.random() * moves.length)];
  }
}
