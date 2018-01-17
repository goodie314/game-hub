import {ChessPiece} from "./chess-piece";
import {ChessBoardSquare} from "../board/chess-board-square";
import {Color} from "../../../util/enums/color";
import {Shade} from "../../../util/enums/shade";
import {Chess} from "../../../util/types/chess/chess";
import {ChessMove} from "../../../util/types/chess/chess-move";
import {BoardDirection} from "../../../util/enums/board-direction";

export class Queen extends ChessPiece {

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
    ctx.strokeText('Q', this.location.x, this.location.y);
    ctx.closePath();
  }

  public getPotentialMoves(chess: Chess): ChessMove[] {
    const moves: ChessMove[] = [];
    const possibleDirections: BoardDirection[] = [
      BoardDirection.FORWARD,
      BoardDirection.FORWARD_RIGHT,
      BoardDirection.RIGHT,
      BoardDirection.BACKWARD_RIGHT,
      BoardDirection.BACKWARD,
      BoardDirection.BACKWARD_LEFT,
      BoardDirection.LEFT,
      BoardDirection.FORWARD_LEFT
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
