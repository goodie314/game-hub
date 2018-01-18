import {ChessPiece} from "./chess-piece";
import {Color} from "../../../util/enums/color";
import {Shade} from "../../../util/enums/shade";
import {ChessBoardSquare} from "../board/chess-board-square";
import {Chess} from "../../../util/types/chess/chess";
import {BoardDirection} from "../../../util/enums/board-direction";
import {ChessMove} from "../../../util/types/chess/chess-move";

export class Pawn extends ChessPiece {

  constructor(boardSquare: ChessBoardSquare, color: Color, shade: Shade) {
    super(boardSquare, color, shade);
    this.value = 1;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    super.draw(ctx);
    if (!this.location || !this.boardSquare) {
      return;
    }
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.location.x, this.location.y, this.boardSquare.getSquareDimension() / 2, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
    ctx.strokeStyle = Color.RED;
    ctx.strokeText('P', this.location.x, this.location.y);
    ctx.closePath();
  }

  public getPotentialMoves(chess: Chess): ChessMove[] {
    const moves: ChessMove[] = [];
    let piece = null;
    let square = null;
    let move = null;

    // check if pawn is in start position in which case it can move 2 spaces forward
    if ((this.shade === Shade.DARK && this.boardSquare.getBoardY() === 6)
      || (this.shade === Shade.LIGHT && this.boardSquare.getBoardY() === 1)) {
      square = chess.getSquare(this, BoardDirection.FORWARD, 2);
      piece = chess.getPieceOnSquare(square);
      move = this.getMoveToSquare(square, piece);
      if (move && !move.capturedPiece) {
        moves.push(move);
      }
    }

    // check if pawn can move forward 1 space
    square = chess.getSquare(this, BoardDirection.FORWARD, 1);
    piece = chess.getPieceOnSquare(square);
    move = this.getMoveToSquare(square, piece);
    if (move && !move.capturedPiece) {
      moves.push(move);
    }

    // check if pawn can capture a piece to the front left
    square = chess.getSquare(this, BoardDirection.FORWARD_LEFT, 1);
    piece = chess.getPieceOnSquare(square);
    move = this.getMoveToSquare(square, piece);
    if (move && move.capturedPiece) {
      moves.push(move);
    }

    // check if pawn can capture a piece to the front right
    square = chess.getSquare(this, BoardDirection.FORWARD_RIGHT, 1);
    piece = chess.getPieceOnSquare(square);
    move = this.getMoveToSquare(square, piece);
    if (move && move.capturedPiece) {
      moves.push(move);
    }

    return moves;
  }
}
