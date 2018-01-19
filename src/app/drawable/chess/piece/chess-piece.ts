import {Vec2} from "../../../util/types/vec2";
import {Color} from "../../../util/enums/color";
import {Shade} from "../../../util/enums/shade";
import {ChessBoardSquare} from "../board/chess-board-square";
import {Chess} from "../../../util/types/chess/chess";
import {ChessMove} from "../../../util/types/chess/chess-move";
import {EventEmitter} from "@angular/core";
import {ChessPieceEnum} from "../../../util/enums/chess-pieces-enum";

export class ChessPiece {

  protected location: Vec2;
  protected boardSquare: ChessBoardSquare;
  protected color: Color;
  protected shade: Shade;
  protected value: number;
  protected type: ChessPieceEnum;

  protected linePoints: Vec2[] = [];
  protected curvePoints: Vec2[] = [];
  protected pieceDimension = 10;

  private velocity: Vec2;
  private speed = .05;
  private movementComplete: EventEmitter<any>;

  constructor(boardSquare: ChessBoardSquare, color: Color, shade: Shade) {
    this.location = boardSquare.getMiddlePosition();
    this.boardSquare = boardSquare;
    this.color = color;
    this.shade = shade;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    if (!this.location || !this.boardSquare) {
      return;
    }
    if (this.velocity) {
      this.location = this.location.add(this.velocity);
      if (this.boardSquare.getMiddlePosition().close(this.location)) {
        this.location = this.boardSquare.getMiddlePosition();
        this.velocity = null;
        this.movementComplete.emit();
        this.movementComplete = null;
      }
    }
  }

  public resize(): void {
    this.location = this.boardSquare.getMiddlePosition();
  }

  public moveToSquare(square: ChessBoardSquare): EventEmitter<any> {
    this.boardSquare = square;
    this.velocity = square.getMiddlePosition().minus(this.location).times(this.speed);
    this.movementComplete = new EventEmitter();
    return this.movementComplete;
  }

  public removeFromBoard(): void {
    this.location = null;
    this.boardSquare = null;
  }

  public getBoardSquare(): ChessBoardSquare {
    return this.boardSquare;
  }

  public setBoardSquare(boardSquare: ChessBoardSquare): void {
    this.boardSquare = boardSquare;
  }

  public getShade(): Shade {
    return this.shade;
  }

  public getColor(): Color {
    return this.color;
  }

  public getPotentialMoves(chess: Chess): ChessMove[] {
    return [];
  }

  public getValue(): number {
    return this.value;
  }

  public getType(): ChessPieceEnum {
    return this.type;
  }

  public equals(piece: ChessPiece): boolean {
    return this.location === piece.location;
  }

  protected getMoveToSquare(square: ChessBoardSquare, piece: ChessPiece): ChessMove {
    if (!square) {
      return null;
    }
    if (piece && piece.getShade() !== this.shade) {
      return {
        movingPiece: this,
        destinationSquare: square,
        capturedPiece: piece
      };
    } else if (!piece) {
      return {
        movingPiece: this,
        destinationSquare: square
      };
    } else {
      return null;
    }
  }

  protected drawPoints(ctx: CanvasRenderingContext2D, stroke = true, fill = true) {
    const scaleFactor = this.boardSquare.getSquareDimension() / this.pieceDimension;
    ctx.fillStyle = this.color;
    if (this.color === Color.WHITE) {
      ctx.strokeStyle = Color.BLACK;
    } else {
      ctx.strokeStyle = Color.WHITE;
    }
    ctx.save();
    ctx.translate(this.location.x, this.location.y);
    ctx.scale(scaleFactor, scaleFactor);
    if (this.shade === Shade.LIGHT) {
      ctx.rotate(Math.PI);
    }
    ctx.beginPath();

    if (this.linePoints.length) {
      const start = this.linePoints[0];
      ctx.moveTo(start.x, start.y);
      for (const point of this.linePoints) {
        ctx.lineTo(point.x, point.y);
      }
    }
    if (this.curvePoints.length) {
      for (let i = 0; i < this.curvePoints.length; i += 3) {
        const start = this.curvePoints[i];
        ctx.moveTo(start.x, start.y);
        ctx.quadraticCurveTo(this.curvePoints[i + 1].x, this.curvePoints[i + 1].y, this.curvePoints[i + 2].x, this.curvePoints[i + 2].y);
      }
    }
    if (fill) {
      ctx.fill();
    }
    if (stroke) {
      ctx.stroke();
    }
    ctx.closePath();
    ctx.restore();
  }
}
