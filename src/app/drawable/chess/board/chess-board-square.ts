import {Vec2} from "../../../util/types/vec2";
import {Color} from "../../../util/enums/color";

export class ChessBoardSquare {
  private squareIndex: number;
  private topLeftPos: Vec2;
  private squareDim: number;
  private middlePos: Vec2;
  private squareColor: string;
  private highlight: boolean;

  constructor (squareIndex: number, topLeftPos: Vec2, squareDim: number, squareColor: Color) {
    this.squareIndex = squareIndex;
    this.topLeftPos = topLeftPos;
    this.squareDim = squareDim;
    this.middlePos = new Vec2(topLeftPos.x + (squareDim / 2), topLeftPos.y + (squareDim / 2));
    this.highlight = false;
    this.squareColor = squareColor;
  }

  public resize(topLeftPos: Vec2, squareDim: number) {
    this.topLeftPos = topLeftPos;
    this.squareDim = squareDim;
    this.middlePos = new Vec2(topLeftPos.x + (squareDim / 2), topLeftPos.y + (squareDim / 2));
  }

  public draw (ctx: CanvasRenderingContext2D) {
    if (this.highlight) {
      ctx.fillStyle = '#f0f022';
    } else {
      ctx.fillStyle = this.squareColor;
    }
    ctx.fillRect(this.topLeftPos.x, this.topLeftPos.y, this.squareDim, this.squareDim);
  }

  public getMiddlePosition(): Vec2 {
    return this.middlePos;
  }

  public getSquareDimension(): number {
    return this.squareDim;
  }

  public contains (x: number, y: number) {
    if (x > this.topLeftPos.x && x < (this.topLeftPos.x + this.squareDim)) {
      if (y > this.topLeftPos.y && y < (this.topLeftPos.y + this.squareDim)) {
        return true;
      }
    }

    return false;
  }

  public equals (square: ChessBoardSquare) {
    return this.topLeftPos.equals(square.topLeftPos);
  }
}
