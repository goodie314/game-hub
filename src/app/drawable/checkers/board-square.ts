
import {Vec2} from "../../util/types/vec2";
import {Shade} from "../../util/enums/shade";
import {Color} from "../../util/enums/color";
import {CheckersPiece} from "./checkers-piece";

export class BoardSquare {
  topLeftPos: Vec2;
  squareDim: number;
  middlePos: Vec2;
  squareShade: Shade;
  squareColor: string;
  highlight: boolean;
  checkersPiece: CheckersPiece;
  // light shaded pieces can get kinged here
  kingMeLight: boolean;
  // dark shaded pieces can get kinged here
  kingMeDark: boolean;

  constructor (topLeftPos: Vec2, squareDim: number, squareShade: Shade) {
    this.topLeftPos = topLeftPos;
    this.squareDim = squareDim;
    this.squareShade =squareShade;
    this.middlePos = new Vec2(topLeftPos.x + (squareDim / 2), topLeftPos.y + (squareDim / 2));
    this.highlight = false;

    switch (squareShade) {
      case Shade.LIGHT:
        this.squareColor = Color.RED;
        break;
      case Shade.DARK:
        this.squareColor = Color.BLACK;
        break;
    }
  }

  draw (ctx: CanvasRenderingContext2D) {
    if (this.highlight) {
      ctx.fillStyle = '#f0f022';
    } else {
      ctx.fillStyle = this.squareColor;
    }
    ctx.fillRect(this.topLeftPos.x, this.topLeftPos.y, this.squareDim, this.squareDim);
  }

  contains (x: number, y: number) {
    if (x > this.topLeftPos.x && x < (this.topLeftPos.x + this.squareDim)) {
      if (y > this.topLeftPos.y && y < (this.topLeftPos.y + this.squareDim)) {
        return true;
      }
    }

    return false;
  }

  equals (square: BoardSquare) {
    return this.topLeftPos.equals(square.topLeftPos);
  }
}
