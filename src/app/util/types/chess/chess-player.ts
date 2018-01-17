import {ChessBoardSquare} from "../../../drawable/chess/board/chess-board-square";
import {ChessPiece} from "../../../drawable/chess/piece/chess-piece";
import {Chess} from "./chess";
import {Shade} from "../../enums/shade";
import {ChessMove} from "./chess-move";

export class ChessPlayer {
  protected myTurn = false;
  protected shade: Shade;
  protected chess: Chess;

  constructor(shade: Shade) {
    this.shade = shade;
  }

  public clickHandler(square: ChessBoardSquare, piece?: ChessPiece): void {
  }

  public yourTurn(chess: Chess): void {
    this.chess = chess;
    this.myTurn = true;
  }

  public takeTurn(move: ChessMove): void {
    if (move.capturedPiece) {
      this.chess.removePieceFromBoard(move.capturedPiece);
    }
    this.chess.movePieceToSquare(move.movingPiece, move.destinationSquare);
    this.myTurn = false;
  }
}
