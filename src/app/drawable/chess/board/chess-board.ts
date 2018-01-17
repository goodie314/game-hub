import {Vec2} from "../../../util/types/vec2";
import {ChessBoardSquare} from "./chess-board-square";
import {Color} from "../../../util/enums/color";

export class ChessBoard {
  // board size information
  private width: number;
  private height: number;
  private topLeft: Vec2;

  // board squares
  private boardSquares: ChessBoardSquare[] = [];

  constructor(canvasWidth: number, canvasHeight: number) {
    this.setDimensions(canvasWidth, canvasHeight);
    this.setupBoardSquares();
  }

  // resize board dimensions and board square dimensions
  public resize(canvasWidth: number, canvasHeight: number) {
    this.setDimensions(canvasWidth, canvasHeight);
    this.resizeBoardSquares();
  }

  // set width, height, and corner position
  private setDimensions(canvasWidth: number, canvasHeight: number) {
    this.height = canvasHeight - 80;
    if (canvasWidth < this.height) {
      this.height = canvasWidth;
      this.width = canvasWidth;
    } else {
      this.width = canvasHeight - 80;
    }

    const diffX = canvasWidth - this.width;
    const diffY = canvasHeight - this.height;
    this.topLeft = new Vec2(diffX / 2, diffY / 2);
  }

  private setupBoardSquares(): void {
    const squareDim = this.height / 8;
    let squareColor = Color.BLACK;

    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        const squarePos = new Vec2(x * squareDim + this.topLeft.x, y * squareDim + this.topLeft.y);
        const square = new ChessBoardSquare(x, y, squarePos, squareDim, squareColor);
        this.boardSquares.push(square);
        switch (squareColor) {
          case Color.BLACK:
            squareColor = Color.WHITE;
            break;
          case Color.WHITE:
            squareColor = Color.BLACK;
            break;
        }
      }
      switch (squareColor) {
        case Color.BLACK:
          squareColor = Color.WHITE;
          break;
        case Color.WHITE:
          squareColor = Color.BLACK;
          break;
      }
    }
  }

  private resizeBoardSquares(): void {
    const squareDim = this.height / 8;
    let index = 0;

    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        const square = this.boardSquares[index];
        const squarePos = new Vec2(x * squareDim + this.topLeft.x, y * squareDim + this.topLeft.y);
        square.resize(squarePos, squareDim);
        index++;
      }
    }
  }

  public draw (ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(this.topLeft.x, this.topLeft.y, this.width, this.height);
    this.boardSquares.forEach(square => {
      square.draw(ctx);
    });
  }

  public getSquares(): ChessBoardSquare[] {
    return this.boardSquares;
  }
}
