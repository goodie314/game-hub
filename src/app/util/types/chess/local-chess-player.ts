import {ChessPlayer} from "./chess-player";
import {Vec2} from "../vec2";
import {ChessBoardSquare} from "../../../drawable/chess/board/chess-board-square";
import {ChessPiece} from "../../../drawable/chess/piece/chess-piece";
import {Chess} from "./chess";
import {Shade} from "../../enums/shade";
import {ChessMove} from "./chess-move";

export class LocalChessPlayer extends ChessPlayer {
  private moves: ChessMove[] = [];

  constructor(shade: Shade) {
    super(shade);
  }

  public clickHandler(square: ChessBoardSquare, piece?: ChessPiece): void {
    if (!this.myTurn) {
      return;
    }
    if (this.moves.length) {
      this.highlightMoves(false);
      for (const move of this.moves) {
        if (square.equals(move.destinationSquare)) {
          this.takeTurn(move);
          this.moves = [];
          return;
        }
      }
      this.moves = [];
    }

    if (piece && piece.getShade() === this.shade) {
      this.moves = piece.getPotentialMoves(this.chess);
      this.highlightMoves(true);
    }
  }

  private highlightMoves(highlight: boolean): void {
    this.moves.forEach(move => {
      move.destinationSquare.setHighlight(highlight);
    });
  }
}
