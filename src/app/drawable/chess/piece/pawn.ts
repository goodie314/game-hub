import {ChessPiece} from "./chess-piece";
import {Color} from "../../../util/enums/color";
import {Shade} from "../../../util/enums/shade";
import {ChessBoardSquare} from "../board/chess-board-square";
import {Chess} from "../../../util/types/chess/chess";
import {BoardDirection} from "../../../util/enums/board-direction";
import {ChessMove} from "../../../util/types/chess/chess-move";
import {ChessPieceEnum} from "../../../util/enums/chess-pieces-enum";
import {Vec2} from "../../../util/types/vec2";

export class Pawn extends ChessPiece {
  protected type = ChessPieceEnum.PAWN;

  constructor(boardSquare: ChessBoardSquare, color: Color, shade: Shade) {
    super(boardSquare, color, shade);
    this.value = 1;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    if (!this.location || !this.boardSquare) {
      return;
    }

    super.draw(ctx);
    if (!this.location || !this.boardSquare) {
      return;
    }
    this.pieceDimension = 40;
    this.linePoints = [
      new Vec2(-4, 0),
      new Vec2(-10, 10),
      new Vec2(10, 10),
      new Vec2(4, 0)
    ];
    this.curvePoints = [
      // top
      new Vec2(-4, 0),
      new Vec2(-6, -10),
      new Vec2(0, -10),

      new Vec2(0, -10),
      new Vec2(6, -10),
      new Vec2(4, 0),

      // decoration
      new Vec2(-4, 0),
      new Vec2(0, 1),
      new Vec2(4, 0)
    ];
    this.drawPoints(ctx);

    this.linePoints = [
      new Vec2(-4, 0),
      new Vec2(0, -10),
      new Vec2(4, 0)
    ];
    this.curvePoints = [];
    this.drawPoints(ctx, false);
  }

  public getPotentialMoves(chess: Chess): ChessMove[] {
    const moves: ChessMove[] = [];
    let piece = null;
    let square = null;
    let move = null;

    // check if pawn is in start position in which case it can move 2 spaces forward
    if ((this.shade === Shade.DARK && this.boardSquare.getBoardY() === 6)
      || (this.shade === Shade.LIGHT && this.boardSquare.getBoardY() === 1)) {
      square = chess.getSquare(this, BoardDirection.FORWARD, 1);
      piece = chess.getPieceOnSquare(square);
      if (!piece) {
        square = chess.getSquare(this, BoardDirection.FORWARD, 2);
        piece = chess.getPieceOnSquare(square);
        move = this.getMoveToSquare(square, piece);
        if (move && !move.capturedPiece) {
          moves.push(move);
        }
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
