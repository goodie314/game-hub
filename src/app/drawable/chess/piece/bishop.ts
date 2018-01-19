import {ChessPiece} from "./chess-piece";
import {ChessBoardSquare} from "../board/chess-board-square";
import {Color} from "../../../util/enums/color";
import {Shade} from "../../../util/enums/shade";
import {ChessMove} from "../../../util/types/chess/chess-move";
import {Chess} from "../../../util/types/chess/chess";
import {BoardDirection} from "../../../util/enums/board-direction";
import {ChessPieceEnum} from "../../../util/enums/chess-pieces-enum";
import {Vec2} from "../../../util/types/vec2";

export class Bishop extends ChessPiece {
  protected type = ChessPieceEnum.BISHOP;

  constructor(boardSquare: ChessBoardSquare, color: Color, shade: Shade) {
    super(boardSquare, color, shade);
    this.value = 3;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    if (!this.location || !this.boardSquare) {
      return;
    }

    super.draw(ctx);
    this.pieceDimension = 125;
    this.linePoints = [
      new Vec2(-10, -45),
      new Vec2(-30, 25),
      new Vec2(-50, 40),
      new Vec2(-40, 50),
      new Vec2(40, 50),
      new Vec2(50, 40),
      new Vec2(30, 25),
      new Vec2(10, -45),
      new Vec2(-10, -45)
    ];
    this.curvePoints = [
      new Vec2(-10, -45),
      new Vec2(0, -50),
      new Vec2(10, -45),

      new Vec2(10, -45),
      new Vec2(10, -30),
      new Vec2(0, -15)
    ];
    ctx.lineWidth = 5;
    this.drawPoints(ctx);
    ctx.lineWidth = 1;
  }

  public getPotentialMoves(chess: Chess): ChessMove[] {
    const moves: ChessMove[] = [];
    const possibleDirections: BoardDirection[] = [
      BoardDirection.FORWARD_RIGHT,
      BoardDirection.FORWARD_LEFT,
      BoardDirection.BACKWARD_RIGHT,
      BoardDirection.BACKWARD_LEFT
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
