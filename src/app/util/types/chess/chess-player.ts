import {ChessBoardSquare} from "../../../drawable/chess/board/chess-board-square";
import {ChessPiece} from "../../../drawable/chess/piece/chess-piece";
import {Chess} from "./chess";
import {Shade} from "../../enums/shade";
import {ChessMove} from "./chess-move";
import {Vec2} from "../vec2";

export class ChessPlayer {
  protected myTurn = false;
  protected shade: Shade;
  protected chess: Chess;
  protected potentialMoves: ChessMove[] = [];

  constructor(shade: Shade) {
    this.shade = shade;
  }

  public clickHandler(square: ChessBoardSquare, piece?: ChessPiece): void {
  }

  public dragHandler(mouseLocation: Vec2): void {
  }

  public yourTurn(chess: Chess): void {
    this.chess = chess;
    this.myTurn = true;
    const myPieces = this.chess.getChessPieces().filter(piece => {
      return piece.getShade() === this.shade;
    });

    myPieces.forEach(piece => {
      this.potentialMoves.push(...piece.getPotentialMoves(this.chess));
    });
    if (!this.potentialMoves.length) {
      this.chess.gameOver('Stalemate');
      return;
    }

    this.potentialMoves = this.potentialMoves.filter(move => {
      return this.chess.isMoveLegal(move);
    });
    if (!this.potentialMoves.length) {
      if (this.shade === Shade.DARK) {
        this.chess.gameOver('Light Wins');
      } else {
        this.chess.gameOver('Dark Wins');
      }
    }
  }

  public takeTurn(move: ChessMove): void {
    if (move) {
      if (move.capturedPiece) {
        this.chess.removePieceFromBoard(move.capturedPiece);
      }
      this.chess.movePieceToSquare(move.movingPiece, move.destinationSquare);
    }
    this.potentialMoves = [];
    this.myTurn = false;
  }
}
