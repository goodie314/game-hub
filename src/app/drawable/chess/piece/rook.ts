import {ChessPiece} from "./chess-piece";
import {ChessBoardSquare} from "../board/chess-board-square";
import {Color} from "../../../util/enums/color";
import {Shade} from "../../../util/enums/shade";
import {Chess} from "../../../util/types/chess/chess";
import {ChessMove} from "../../../util/types/chess/chess-move";
import {BoardDirection} from "../../../util/enums/board-direction";

export class Rook extends ChessPiece {

  constructor(boardSquare: ChessBoardSquare, color: Color, shade: Shade) {
    super(boardSquare, color, shade);
  }

  public draw(ctx: CanvasRenderingContext2D) {
    super.draw(ctx);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.location.x, this.location.y, this.boardSquare.getSquareDimension() / 2, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
    ctx.strokeStyle = Color.RED;
    ctx.strokeText('R', this.location.x, this.location.y);
    ctx.closePath();
  }

  public getPotentialMoves(chess: Chess): ChessMove[] {
    const moves: ChessMove[] = [];
    const possibleDirections: BoardDirection[] = [
      BoardDirection.FORWARD,
      BoardDirection.RIGHT,
      BoardDirection.BACKWARD,
      BoardDirection.LEFT
    ];
    let piece = null;
    let square = null;
    let move = null;

    for (const direction of possibleDirections) {
      for (let i = 1; i < 8; i++) {
        square = chess.getSquare(this, direction, i);
        piece = chess.getPieceOnSquare(square);
        move = this.getMoveToSquare(square, piece);
        if (move) {
          moves.push(move);
          if (move.capturedPiece) {
            break;
          }
        } else {
          break;
        }
      }
    }

    return moves;
  }
}