import {ChessPiece} from "./chess-piece";
import {ChessBoardSquare} from "../board/chess-board-square";
import {Color} from "../../../util/enums/color";
import {Shade} from "../../../util/enums/shade";
import {Chess} from "../../../util/types/chess/chess";
import {ChessMove} from "../../../util/types/chess/chess-move";
import {BoardDirection} from "../../../util/enums/board-direction";
import {ChessPieceEnum} from "../../../util/enums/chess-pieces-enum";
import {Vec2} from "../../../util/types/vec2";

export class Rook extends ChessPiece {
  protected type = ChessPieceEnum.ROOK;

  constructor(boardSquare: ChessBoardSquare, color: Color, shade: Shade) {
    super(boardSquare, color, shade);
    this.value = 5;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    if (!this.location || !this.boardSquare) {
      return;
    }

    super.draw(ctx);
    if (!this.location || !this.boardSquare) {
      return;
    }
    this.pieceDimension = 30;
    this.linePoints = [
      // bottom left corner
      new Vec2(-10, 10),
      new Vec2(-10, 5),
      new Vec2(-8, 5),
      new Vec2(-8, -5),
      new Vec2(-10, -5),
      // top left corner
      new Vec2(-10, -10),
      // grooves
      new Vec2(-10, -12),
      new Vec2(-6, -12),
      new Vec2(-6, -10),

      new Vec2(-2, -10),
      new Vec2(-2, -12),
      new Vec2(2, -12),
      new Vec2(2, -10),

      new Vec2(6, -10),
      new Vec2(6, -12),
      new Vec2(10, -12),
      // top right corner
      new Vec2(10, -10),
      new Vec2(10, -5),
      new Vec2(8, -5),
      new Vec2(8, 5),
      new Vec2(10, 5),
      // bottom right corner
      new Vec2(10, 10),
      new Vec2(-10, 10)
    ];
    this.curvePoints = [];
    this.drawPoints(ctx);
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
