import {ChessPiece} from "./chess-piece";
import {ChessBoardSquare} from "../board/chess-board-square";
import {Color} from "../../../util/enums/color";
import {Shade} from "../../../util/enums/shade";
import {Chess} from "../../../util/types/chess/chess";
import {ChessMove} from "../../../util/types/chess/chess-move";
import {BoardDirection} from "../../../util/enums/board-direction";
import {ChessPieceEnum} from "../../../util/enums/chess-pieces-enum";
import {Vec2} from "../../../util/types/vec2";

export class Queen extends ChessPiece {
  protected type = ChessPieceEnum.QUEEN;

  constructor(boardSquare: ChessBoardSquare, color: Color, shade: Shade) {
    super(boardSquare, color, shade);
    this.value = 9;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    if (!this.location || !this.boardSquare) {
      return;
    }

    super.draw(ctx);

    ctx.lineWidth = 5;
    this.pieceDimension = 150;
    this.linePoints = [
      new Vec2(-20, 60),
      new Vec2(-30, 50),
      new Vec2(-10, -40),
      new Vec2(0, -30),
      new Vec2(10, -40),
      new Vec2(30, 50),
      new Vec2(20, 60),
      new Vec2(-20, 60)
    ];
    this.curvePoints = [];
    this.drawPoints(ctx);

    const scaleFactor = this.boardSquare.getSquareDimension() / this.pieceDimension;
    ctx.fillStyle = this.color;
    if (this.color === Color.WHITE) {
      ctx.strokeStyle = Color.BLACK;
    } else {
      ctx.strokeStyle = Color.WHITE;
    }
    ctx.beginPath();
    ctx.save();
    ctx.translate(this.location.x, this.location.y);
    ctx.scale(scaleFactor, scaleFactor);
    if (this.shade === Shade.LIGHT) {
      ctx.rotate(Math.PI);
    }
    ctx.lineWidth = 5;
    ctx.arc(0, -50, 10, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
    ctx.restore();
    ctx.closePath();
    ctx.lineWidth = 1;
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
