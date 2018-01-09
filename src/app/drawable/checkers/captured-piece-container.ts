import {Vec2} from "../../util/types/vec2";
import {CheckersPiece} from "./checkers-piece";
import {Color} from "../../util/enums/color";
import {Shade} from "../../util/enums/shade";

export class CapturedPieceContainer {
  location: Vec2;
  height: number;
  tokenColor: Color;
  token: CheckersPiece;
  capturedPieces: number;
  movingPieces: CheckersPiece[] = [];
  highlight = false;

  constructor (location: Vec2, height: number, tokenColor: Color, tokenShade: Shade) {
    this.location = location;
    this.location.x -= 20;
    this.height = height;
    this.tokenColor = tokenColor;
    this.token = new CheckersPiece(tokenColor, location, height / 4, tokenShade);
    this.capturedPieces = 0;
  }

  draw (ctx): void {
    this.token.king = this.highlight;
    this.token.draw(ctx);
    ctx.fillStyle = '#000000';
    ctx.font = "24px Times New Roman";
    ctx.fillText(' X ' + this.capturedPieces, this.location.x + this.token.radius, this.location.y + 6);
    this.movingPieces.forEach((piece) => {
      piece.draw(ctx);
    });
  }

  pieceCaptured (piece: CheckersPiece): void {
    piece.moveOffBoard(this.location);
    this.movingPieces.push(piece);
    this.capturedPieces++;
  }
}
