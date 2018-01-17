import {Vec2} from "../vec2";
import {ChessBoardSquare} from "../../../drawable/chess/board/chess-board-square";
import {ChessPiece} from "../../../drawable/chess/piece/chess-piece";
import {Chess} from "./chess";
import {Shade} from "../../enums/shade";
import {ChessMove} from "./chess-move";

export class ChessPlayer {
  protected myTurn = false;
  protected shade: Shade;

  constructor(shade: Shade) {
    this.shade = shade;
  }

  public clickHandler(chess: Chess, square: ChessBoardSquare, piece?: ChessPiece): void {
  }

  public yourTurn(): void {
    this.myTurn = true;
  }

  public takeTurn(chess: Chess, move: ChessMove): void {
    if (move.capturedPiece) {
      chess.removePieceFromBoard(move.capturedPiece);
    }
    chess.movePieceToSquare(move.movingPiece, move.destinationSquare);
    this.myTurn = false;
  }
}
