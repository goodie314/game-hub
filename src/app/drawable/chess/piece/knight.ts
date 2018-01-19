import {ChessPiece} from "./chess-piece";
import {BoardDirection} from "../../../util/enums/board-direction";
import {ChessBoardSquare} from "../board/chess-board-square";
import {Color} from "../../../util/enums/color";
import {Shade} from "../../../util/enums/shade";
import {Chess} from "../../../util/types/chess/chess";
import {ChessMove} from "../../../util/types/chess/chess-move";
import {ChessPieceEnum} from "../../../util/enums/chess-pieces-enum";
import {Vec2} from "../../../util/types/vec2";

export class Knight extends ChessPiece {
  protected type = ChessPieceEnum.KNIGHT;

  constructor(boardSquare: ChessBoardSquare, color: Color, shade: Shade) {
    super(boardSquare, color, shade);
    this.value = 3;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    if (!this.location || !this.boardSquare) {
      return;
    }

    super.draw(ctx);

    let mirror = 1;
    if (this.boardSquare.getBoardX() > 3) {
      mirror = -1;
    }
    this.pieceDimension = 150;
    this.linePoints = [
      new Vec2(-50 * mirror, 40),
      new Vec2(0, -50),
      new Vec2(0, -40),
      new Vec2(20 * mirror, -40),
      new Vec2(50 * mirror, 0),
      new Vec2(10 * mirror, 0),
      new Vec2(50 * mirror, 40),
      new Vec2(40 * mirror, 40),
      new Vec2(40 * mirror, 50),
      new Vec2(-40 * mirror, 50),
      new Vec2(-40 * mirror, 40),
      new Vec2(-50 * mirror, 40)
    ];
    this.curvePoints = [];
    ctx.lineWidth = 5;
    this.drawPoints(ctx);
    ctx.lineWidth = 1;
  }

  public getPotentialMoves(chess: Chess): ChessMove[] {
    const moves: ChessMove[] = [];
    let tempSquare;
    let piece = null;
    let square = null;
    let move = null;

    // Get forward knight moves
    tempSquare = chess.getSquare(this, BoardDirection.FORWARD, 2);
    if (tempSquare) {
      square = chess.getSquare(this, BoardDirection.LEFT, 1, tempSquare);
      piece = chess.getPieceOnSquare(square);
      move = this.getMoveToSquare(square, piece);
      if (move) {
        moves.push(move);
      }
      square = chess.getSquare(this, BoardDirection.RIGHT, 1, tempSquare);
      piece = chess.getPieceOnSquare(square);
      move = this.getMoveToSquare(square, piece);
      if (move) {
        moves.push(move);
      }
    }

    // Get right knight moves
    tempSquare = chess.getSquare(this, BoardDirection.RIGHT, 2);
    if (tempSquare) {
      square = chess.getSquare(this, BoardDirection.FORWARD, 1, tempSquare);
      piece = chess.getPieceOnSquare(square);
      move = this.getMoveToSquare(square, piece);
      if (move) {
        moves.push(move);
      }
      square = chess.getSquare(this, BoardDirection.BACKWARD, 1, tempSquare);
      piece = chess.getPieceOnSquare(square);
      move = this.getMoveToSquare(square, piece);
      if (move) {
        moves.push(move);
      }
    }

    // Get backward knight moves
    tempSquare = chess.getSquare(this, BoardDirection.BACKWARD, 2);
    if (tempSquare) {
      square = chess.getSquare(this, BoardDirection.LEFT, 1, tempSquare);
      piece = chess.getPieceOnSquare(square);
      move = this.getMoveToSquare(square, piece);
      if (move) {
        moves.push(move);
      }
      square = chess.getSquare(this, BoardDirection.RIGHT, 1, tempSquare);
      piece = chess.getPieceOnSquare(square);
      move = this.getMoveToSquare(square, piece);
      if (move) {
        moves.push(move);
      }
    }

    // Get left knight moves
    tempSquare = chess.getSquare(this, BoardDirection.LEFT, 2);
    if (tempSquare) {
      square = chess.getSquare(this, BoardDirection.FORWARD, 1, tempSquare);
      piece = chess.getPieceOnSquare(square);
      move = this.getMoveToSquare(square, piece);
      if (move) {
        moves.push(move);
      }
      square = chess.getSquare(this, BoardDirection.BACKWARD, 1, tempSquare);
      piece = chess.getPieceOnSquare(square);
      move = this.getMoveToSquare(square, piece);
      if (move) {
        moves.push(move);
      }
    }

    return moves;
  }
}
