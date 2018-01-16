import {ChessPlayer} from "./chess-player";
import {Vec2} from "../vec2";
import {ChessBoard} from "../../../drawable/chess/board/chess-board";
export class Chess {

  private chessBoard;
  private chessPieces;
  private players: ChessPlayer[]

  constructor(players: ChessPlayer[]) {
    this.players = players;
    this.chessBoard = new ChessBoard(100, 100);
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    this.chessBoard.draw(ctx);
  }

  public clickHander(clickLocation: Vec2) {
    this.players.forEach(player => { player.clickHandler(clickLocation); });
  }

  public movePieceToSquare(piece, square) {
  }

  public removePieceFromBoard(piece) {
  }

  public getPotentialMovesForPiece(piece): any[] {
    return [];
  }
}
