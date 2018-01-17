import {Vec2} from "../../../util/types/vec2";
import {Color} from "../../../util/enums/color";
import {Shade} from "../../../util/enums/shade";
import {ChessBoardSquare} from "../board/chess-board-square";
import {Chess} from "../../../util/types/chess/chess";
import {ChessMove} from "../../../util/types/chess/chess-move";
import {EventEmitter} from "@angular/core";

export class ChessPiece {

  protected location: Vec2;
  protected boardSquare: ChessBoardSquare;
  protected color: Color;
  protected shade: Shade;

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
    this.boardSquare = null;
    this.location = new Vec2(0, 0);
  }

  public getBoardSquare(): ChessBoardSquare {
    return this.boardSquare;
  }

  public getShade(): Shade {
    return this.shade;
  }

  public getPotentialMoves(chess: Chess): ChessMove[] {
    return [];
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
}
