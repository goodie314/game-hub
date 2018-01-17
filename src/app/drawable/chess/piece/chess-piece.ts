import {Vec2} from "../../../util/types/vec2";
import {Color} from "../../../util/enums/color";
import {Shade} from "../../../util/enums/shade";
import {ChessBoardSquare} from "../board/chess-board-square";

export class ChessPiece {

  protected location: Vec2;
  protected boardSquare: ChessBoardSquare;
  protected color: Color;
  protected shade: Shade;

  constructor(boardSquare: ChessBoardSquare, color: Color, shade: Shade) {
    this.location = boardSquare.getMiddlePosition();
    this.boardSquare = boardSquare;
    this.color = color;
    this.shade = shade;
  }

  public draw(ctx: CanvasRenderingContext2D) {
  }

  public resize(): void {
    this.location = this.boardSquare.getMiddlePosition();
  }
}
