import {ChessPiece} from "../../../drawable/chess/piece/chess-piece";
import {ChessBoardSquare} from "../../../drawable/chess/board/chess-board-square";

export interface ChessMove {
  movingPiece: ChessPiece;
  destinationSquare: ChessBoardSquare;
  capturedPiece?: ChessPiece;
}
