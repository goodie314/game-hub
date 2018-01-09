
import {Vec2} from "../../util/types/vec2";
import {BoardSquare} from "./board-square";
import {Shade} from "../../util/enums/shade";
import {CheckersPiece} from "./checkers-piece";
import {Color} from "../../util/enums/color";
import {PotentialMove} from "../../util/types/potential-move";
import {CapturedPieceContainer} from "./captured-piece-container";
import {CheckersAI} from "../../util/types/checkers-ai";
import {VS} from "../../util/enums/vs";
import {EventEmitter} from "@angular/core";

export class Board {
  matchType: VS;
  width: number;
  height: number;
  topLeft: Vec2;
  boardSquares: BoardSquare[] = [];
  pieces: CheckersPiece[] = [];
  selectedSquare: BoardSquare;
  potentialMoves: PotentialMove[] = [];
  requiredMove = false;
  darkTurn = true;
  darkPieceContainer: CapturedPieceContainer;
  lightPieceContainer: CapturedPieceContainer;
  gameOver: EventEmitter<any> = new EventEmitter();

  constructor(matchType: VS, canvasDimensions: Vec2) {
    this.matchType = matchType;
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
    this.setCapturedPieceContainers(this.topLeft, 40, canvasDimensions.x);
    this.setBoardSquares();
    this.setPieces();
  }

  setCapturedPieceContainers (topLeft: Vec2, spaceBelow: number, width: number) {
    const centerX = width / 2;
    const topLocation = new Vec2(centerX, topLeft.y - (spaceBelow / 2));
    const bottomLocation = new Vec2(centerX, topLeft.y + this.height + (spaceBelow / 2));
    this.darkPieceContainer = new CapturedPieceContainer(topLocation, spaceBelow, Color.RED, Shade.DARK);
    this.lightPieceContainer = new CapturedPieceContainer(bottomLocation, spaceBelow, Color.WHITE, Shade.LIGHT);
    this.lightPieceContainer.highlight = true;
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
        this.pieces.push(piece);
        square.checkersPiece = piece;
      }
    }

    for (let i = 40; i < 63; i++) {
      const square = this.boardSquares[i];
      if (square.squareShade === Shade.DARK) {
        const piece = new CheckersPiece(Color.RED, square.middlePos, (square.squareDim / 2) * .75, Shade.DARK);
        this.pieces.push(piece);
        square.checkersPiece = piece;
      }
    }
  }

  resize (canvasDimensions: Vec2) {
    const board = new Board(this.matchType, canvasDimensions);
    board.darkTurn = this.darkTurn;
    board.gameOver = this.gameOver;
    board.restoreSavedState(this.boardSquares);
    return board;
  }

  restoreSavedState(squares: BoardSquare[]) {
    this.pieces = [];
    for (let i = 0; i < this.boardSquares.length; i++) {
      const square = this.boardSquares[i];
      square.checkersPiece = squares[i].checkersPiece;
      if (square.checkersPiece) {
        square.checkersPiece.resize(square.middlePos, (square.squareDim / 2) * .75);
        this.pieces.push(square.checkersPiece);
      }
    }
  }

  draw (ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(this.topLeft.x, this.topLeft.y, this.width, this.height);
    for (const square of this.boardSquares) {
      square.draw(ctx);
    }
    for (const piece of this.pieces) {
      piece.draw(ctx);
    }

    this.darkPieceContainer.draw(ctx);
    this.lightPieceContainer.draw(ctx);
  }

  handleClick(x: number, y: number) {
    for (let i = 0; i < this.boardSquares.length; i++) {
      const square = this.boardSquares[i];
      if (square.contains(x, y)) {
        if (this.selectedSquare) {
          this.movePiece(square);
        } else if (square.checkersPiece) {
          if (this.validTurn(square.checkersPiece)) {
            this.selectedSquare = square;
            this.highlightMoves(square, i);
          }
        }
      }
    }
  }

  highlightMoves (square: BoardSquare, squareIndex: number, jumpsOnly = false, highlight = true) {
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
      if (this.isMoveValid(potentialMove) && !jumpsOnly) {
        potentialMove.highlight = highlight;
        this.potentialMoves.push(new PotentialMove(square, potentialMove, null));
      } else if (this.isMoveValid(hopMove) && potentialMove.checkersPiece && (potentialMove.checkersPiece.shade !== piece.shade)) {
        hopMove.highlight = highlight;
        this.potentialMoves.push(new PotentialMove(square, hopMove, potentialMove));
      }

      potentialMove = this.boardSquares[squareIndex + (multiplier * 9)];
      hopMove = this.boardSquares[squareIndex + (2 * (multiplier * 9))];
      if (this.isMoveValid(potentialMove) && !jumpsOnly) {
        potentialMove.highlight = highlight;
        this.potentialMoves.push(new PotentialMove(square, potentialMove, null));
      } else if (this.isMoveValid(hopMove) && potentialMove.checkersPiece && (potentialMove.checkersPiece.shade !== piece.shade)) {
        hopMove.highlight = highlight;
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
        this.requiredMove = false;
        this.selectedSquare.checkersPiece.move(selectedSquare);
        selectedSquare.checkersPiece = this.selectedSquare.checkersPiece;
        this.selectedSquare.checkersPiece = null;
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

        const savedMove = move.copy();
        this.unhighlightMoves();
        if (savedMove.capturedSquare) {
          this.removePiece(savedMove.capturedSquare);
          const index = this.getSquareIndex(selectedSquare);
          this.highlightMoves(selectedSquare, index, true);
          if (this.potentialMoves.length) {
            this.selectedSquare = selectedSquare;
            this.requiredMove = true;
          } else {
            this.nextTurn();
          }
        } else {
          this.nextTurn();
        }

        return;
      }
    }

    if (!this.requiredMove) {
      this.unhighlightMoves();
    }
  }

  getSquareIndex (square: BoardSquare) {
    for (let i = 0; i < this.boardSquares.length; i++) {
      if (this.boardSquares[i].equals(square)) {
        return i;
      }
    }
    return -1;
  }

  removePiece (capturedSquare: BoardSquare) {
    for (let i = this.pieces.length - 1; i > -1; i--) {
      const piece = this.pieces[i];
      if (piece.equals(capturedSquare.checkersPiece)) {
        capturedSquare.checkersPiece = null;
        this.pieces.splice(i, 1);
        switch (piece.shade) {
          case Shade.LIGHT:
            this.lightPieceContainer.pieceCaptured(piece);
            break;
          case Shade.DARK:
            this.darkPieceContainer.pieceCaptured(piece);
            break;
        }
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

  validTurn (piece: CheckersPiece): boolean {
    return (this.darkTurn && (piece.shade === Shade.DARK)) || (!this.darkTurn && (piece.shade === Shade.LIGHT));
  }

  nextTurn (): void {
    if (this.darkPieceContainer.capturedPieces === 12 || this.lightPieceContainer.capturedPieces === 12) {
      this.gameOver.emit(true);
      return;
    }

    this.darkTurn = !this.darkTurn;

    if (this.darkTurn) {
      this.darkPieceContainer.highlight = false;
      this.lightPieceContainer.highlight = true;
    } else {
      this.darkPieceContainer.highlight = true;
      this.lightPieceContainer.highlight = false;
    }

    switch (this.matchType) {
      case VS.COMPUTER:
        if (!this.darkTurn) {
          const ai = new CheckersAI(Shade.LIGHT);
          ai.takeTurn(this);
        }
        break;
      default:
        break;
    }
  }
}
