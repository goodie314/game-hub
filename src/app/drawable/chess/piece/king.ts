import {ChessPiece} from "./chess-piece";
import {ChessBoardSquare} from "../board/chess-board-square";
import {Color} from "../../../util/enums/color";
import {Shade} from "../../../util/enums/shade";
import {Chess} from "../../../util/types/chess/chess";
import {ChessMove} from "../../../util/types/chess/chess-move";
import {BoardDirection} from "../../../util/enums/board-direction";
import {ChessPieceEnum} from "../../../util/enums/chess-pieces-enum";

export class King extends ChessPiece {
  protected type = ChessPieceEnum.KING;

  constructor(boardSquare: ChessBoardSquare, color: Color, shade: Shade) {
    super(boardSquare, color, shade);
    this.value = 99;
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
    ctx.strokeText('K', this.location.x, this.location.y);
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
