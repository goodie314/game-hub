
import {Vec2} from "../../util/types/vec2";
import {BoardSquare} from "./board-square";
import {Shade} from "../../util/enums/shade";
import {CheckersPiece} from "./checkers-piece";
import {Color} from "../../util/enums/color";
import {PotentialMove} from "../../util/types/potential-move";

export class Board {
  width: number;
  height: number;
  topLeft: Vec2;
  boardSquares: BoardSquare[] = [];
  darkPieces: CheckersPiece[] = [];
  lightPieces: CheckersPiece[] = [];
  selectedSquare: BoardSquare;
  potentialMoves: PotentialMove[] = [];

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
        const square = new BoardSquare(squarePos, squareDim, squareShade);
        if (y === 0) {
          square.kingMeDark = true;
        } else if (y === 7) {
          square.kingMeLight = true;
        }
        this.boardSquares.push(square);
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
        const piece = new CheckersPiece(Color.WHITE, square.middlePos, (square.squareDim / 2) * .75, Shade.LIGHT);
        this.lightPieces.push(piece);
        square.checkersPiece = piece;
      }
    }

    for (let i = 40; i < 63; i++) {
      const square = this.boardSquares[i];
      if (square.squareShade === Shade.DARK) {
        const piece = new CheckersPiece(Color.RED, square.middlePos, (square.squareDim / 2) * .75, Shade.DARK);
        this.darkPieces.push(piece);
        square.checkersPiece = piece;
      }
    }
  }

  resize (width: number, height: number) {
    this.height = height - 80;
    if (width < this.height) {
      this.height = width;
      this.width = width;
    } else {
      this.width = height - 80;
    }

    const diffX = width - this.width;
    const diffY = height - this.height;
    this.topLeft = new Vec2(diffX / 2, diffY / 2);
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

  handleClick(x: number, y: number) {
    console.log(x, y);
    for (let i = 0; i < this.boardSquares.length; i++) {
      const square = this.boardSquares[i];
      if (square.contains(x, y)) {
        if (this.selectedSquare) {
          this.movePiece(square);
          this.unhighlightMoves();
        } else if (square.checkersPiece) {
          console.log('piece: ', square.checkersPiece.shade);
          this.selectedSquare = square;
          this.highlightMoves(square, i);
        }
      }
    }
  }

  highlightMoves (square: BoardSquare, squareIndex: number) {
    const piece = square.checkersPiece;
    let multiplier;

    switch (piece.shade) {
      case Shade.DARK:
        multiplier = -1;
        break;
      case Shade.LIGHT:
        multiplier = 1;
        break;
    }

    for (let i = 0; i < 2; i++) {
      let potentialMove = this.boardSquares[squareIndex + (multiplier * 7)];
      let hopMove = this.boardSquares[squareIndex + (2 * (multiplier * 7))];
      if (this.isMoveValid(potentialMove)) {
        potentialMove.highlight = true;
        this.potentialMoves.push(new PotentialMove(square, potentialMove, null));
      } else if (this.isMoveValid(hopMove) && (potentialMove.checkersPiece.shade !== piece.shade)) {
        hopMove.highlight = true;
        this.potentialMoves.push(new PotentialMove(square, hopMove, potentialMove));
      }

      potentialMove = this.boardSquares[squareIndex + (multiplier * 9)];
      hopMove = this.boardSquares[squareIndex + (2 * (multiplier * 9))];
      if (this.isMoveValid(potentialMove)) {
        potentialMove.highlight = true;
        this.potentialMoves.push(new PotentialMove(square, potentialMove, null));
      } else if (this.isMoveValid(hopMove) && (potentialMove.checkersPiece.shade !== piece.shade)) {
        hopMove.highlight = true;
        this.potentialMoves.push(new PotentialMove(square, hopMove, potentialMove));
      }
      if (piece.king) {
        multiplier *= -1;
      } else {
        break;
      }
    }

    if (!this.potentialMoves.length) {
      this.selectedSquare = null;
    }
  }

  isMoveValid (potentialSquare: BoardSquare): boolean {
    if (potentialSquare) {
      return (potentialSquare.squareShade === Shade.DARK) && !potentialSquare.checkersPiece;
    } else {
      return false;
    }
  }

  movePiece (selectedSquare: BoardSquare) {
    for (const move of this.potentialMoves) {
      if (move.destinationSquare.equals(selectedSquare)) {
        const piece = move.sourceSquare.checkersPiece;
        this.selectedSquare.checkersPiece.move(selectedSquare);
        selectedSquare.checkersPiece = this.selectedSquare.checkersPiece;
        this.selectedSquare.checkersPiece = null;
        if (move.capturedSquare) {
          this.removePiece(move.capturedSquare);
        }
        switch (piece.shade) {
          case Shade.DARK:
            if (move.destinationSquare.kingMeDark) {
              piece.king = true;
            }
            break;
          case Shade.LIGHT:
            if (move.destinationSquare.kingMeLight) {
              piece.king = true;
            }
        }
      }
    }
  }

  removePiece (capturedSquare: BoardSquare) {
    for (let i = this.darkPieces.length - 1; i > -1; i--) {
      const piece = this.darkPieces[i];
      if (piece.equals(capturedSquare.checkersPiece)) {
        capturedSquare.checkersPiece = null;
        this.darkPieces.splice(i, 1);
        return;
      }
    }

    for (let i = this.lightPieces.length - 1; i > -1; i--) {
      const piece = this.lightPieces[i];
      if (piece.equals(capturedSquare.checkersPiece)) {
        capturedSquare.checkersPiece = null;
        this.lightPieces.splice(i, 1);
        return;
      }
    }
  }

  unhighlightMoves () {
    this.selectedSquare = null;

    this.potentialMoves.forEach((move) => {
      move.destinationSquare.highlight = false;
    });
    this.potentialMoves = [];
  }
}
