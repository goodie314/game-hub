import {ChessPiece} from "./chess-piece";
import {ChessBoardSquare} from "../board/chess-board-square";
import {Color} from "../../../util/enums/color";
import {Shade} from "../../../util/enums/shade";
import {Chess} from "../../../util/types/chess/chess";
import {ChessMove} from "../../../util/types/chess/chess-move";
import {BoardDirection} from "../../../util/enums/board-direction";
import {ChessPieceEnum} from "../../../util/enums/chess-pieces-enum";
import {Vec2} from "../../../util/types/vec2";

export class King extends ChessPiece {
  protected type = ChessPieceEnum.KING;

  constructor(boardSquare: ChessBoardSquare, color: Color, shade: Shade) {
    super(boardSquare, color, shade);
    this.value = 99;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    if (!this.location || !this.boardSquare) {
      return;
    }

    super.draw(ctx);

    this.pieceDimension = 125;
    this.linePoints = [
      // bottom left corner
      new Vec2(-20, 60),
      new Vec2(-30, 50),
      new Vec2(-20, -20),
      // bottom left corner of cross
      new Vec2(-10, -20),
      new Vec2(-10, -30),
      new Vec2(-25, -30),
      new Vec2(-25, -40),
      new Vec2(-10, -40),
      new Vec2(-10, -50),
      new Vec2(10, -50),
      new Vec2(10, -40),
      new Vec2(25, -40),
      new Vec2(25, -30),
      new Vec2(10, -30),
      new Vec2(10, -20),
      new Vec2(20, -20),
      new Vec2(30, 50),
      new Vec2(20, 60),
      new Vec2(-20, 60)
    ];
    this.curvePoints = [];
    this.drawPoints(ctx);
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
    let piece;
    let square;
    let move;

    for (const direction of possibleDirections) {
      square = chess.getSquare(this, direction, 1);
      piece = chess.getPieceOnSquare(square);
      move = this.getMoveToSquare(square, piece);
      if (move) {
        moves.push(move);
      }
    }

    return moves;
  }
}
