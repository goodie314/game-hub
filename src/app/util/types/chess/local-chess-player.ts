import {ChessPlayer} from "./chess-player";
import {ChessBoardSquare} from "../../../drawable/chess/board/chess-board-square";
import {ChessPiece} from "../../../drawable/chess/piece/chess-piece";
import {Shade} from "../../enums/shade";
import {ChessMove} from "./chess-move";
import {Vec2} from "../vec2";

export class LocalChessPlayer extends ChessPlayer {
  private selectedPiece: ChessPiece;
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
          this.selectedPiece = null;
          return;
        }
      }
      this.moves = [];
      const oldLocation = this.selectedPiece.getBoardSquare().getMiddlePosition();
      this.selectedPiece.setLocation(oldLocation);
      this.selectedPiece = null;
    }

    if (piece && piece.getShade() === this.shade) {
      this.moves = this.potentialMoves.filter(move => {
        return piece.equals(move.movingPiece);
      });
      if (this.moves.length) {
        this.selectedPiece = piece;
      }
      this.highlightMoves(true);
    }
  }

  private highlightMoves(highlight: boolean): void {
    this.moves.forEach(move => {
      move.destinationSquare.setHighlight(highlight);
    });
  }

  public dragHandler(mouseLocation: Vec2): void {
    if (this.selectedPiece) {
      this.selectedPiece.setLocation(mouseLocation);
    }
  }
}
