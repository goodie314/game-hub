
import {Vec2} from "../../util/types/vec2";
import {BoardSquare} from "./board-square";
import {Shade} from "../../util/enums/shade";
import {CheckersPiece} from "./checkers-piece";
import {Color} from "../../util/enums/color";

export class Board {
  width: number;
  height: number;
  topLeft: Vec2;
  boardSquares: BoardSquare[] = [];
  darkPieces: CheckersPiece[] = [];
  lightPieces: CheckersPiece[] = [];

  constructor(canvasDimensions: Vec2) {
    this.height = canvasDimensions.y - 80;
    if (canvasDimensions.x < this.height) {
      this.height = canvasDimensions.x;
      this.width = canvasDimensions.x;
    } else {
      this.width = canvasDimensions.y - 80;
    }

    const diffX = canvasDimensions.x - this.width;
    const diffY = canvasDimensions.y - this.height;
    this.topLeft = new Vec2(diffX / 2, diffY / 2);
    this.setBoardSquares();
    this.setPieces();
  }

  setBoardSquares () {
    const squareDim = this.height / 8;
    let squareShade = Shade.LIGHT;

    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        const squarePos = new Vec2(x * squareDim + this.topLeft.x, y * squareDim + this.topLeft.y);
        this.boardSquares.push(new BoardSquare(squarePos, squareDim, squareShade));
        switch (squareShade) {
          case Shade.LIGHT:
            squareShade = Shade.DARK;
            break;
          case Shade.DARK:
            squareShade = Shade.LIGHT;
            break;
        }
      }
      switch (squareShade) {
        case Shade.LIGHT:
          squareShade = Shade.DARK;
          break;
        case Shade.DARK:
          squareShade = Shade.LIGHT;
          break;
      }
    }
  }

  setPieces () {

    for (let i = 1; i < 24; i++) {
      const square = this.boardSquares[i];
      if (square.squareShade === Shade.DARK) {
        this.lightPieces.push(new CheckersPiece(Color.WHITE, square.middlePos, (square.squareDim / 2) * .75, Shade.LIGHT));
      }
    }

    for (let i = 40; i < 63; i++) {
      const square = this.boardSquares[i];
      if (square.squareShade === Shade.DARK) {
        this.darkPieces.push(new CheckersPiece(Color.RED, square.middlePos, (square.squareDim / 2) * .75, Shade.DARK));
      }
    }
  }

  draw (ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(this.topLeft.x, this.topLeft.y, this.width, this.height);
    for (const square of this.boardSquares) {
      square.draw(ctx);
    }
    for (const piece of this.darkPieces) {
      piece.draw(ctx);
    }
    for (const piece of this.lightPieces) {
      piece.draw(ctx);
    }
  }
}
