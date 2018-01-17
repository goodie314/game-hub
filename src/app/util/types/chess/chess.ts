import {ChessPlayer} from "./chess-player";
import {Vec2} from "../vec2";
import {ChessBoard} from "../../../drawable/chess/board/chess-board";
import {ChessPiece} from "../../../drawable/chess/piece/chess-piece";
import {Color} from "../../enums/color";
import {Pawn} from "../../../drawable/chess/piece/pawn";
import {Shade} from "../../enums/shade";
import {BoardDirection} from "../../enums/board-direction";
import {ChessBoardSquare} from "../../../drawable/chess/board/chess-board-square";
export class Chess {

  private chessBoard: ChessBoard;
  private chessPieces: ChessPiece[];
  private players: ChessPlayer[];

  private darkTurn = true;
  private darkPlayer: ChessPlayer;
  private lightPlayer: ChessPlayer;

  constructor(canvasWidth: number, canvasHeight: number, players: ChessPlayer[]) {
    this.players = players;
    this.chessBoard = new ChessBoard(canvasWidth, canvasHeight);
    this.chessPieces = this.setupPieces();
    this.darkPlayer = players[0];
    this.lightPlayer = players[1];
    this.darkPlayer.yourTurn();
  }

  // set pieces in their starting positions
  private setupPieces(): ChessPiece[] {
    const pieces: ChessPiece[] = [];
    const squares = this.chessBoard.getSquares();
    let pieceColor = Color.WHITE;
    let pieceShade = Shade.LIGHT;

    for (let i = 8; i < 16; i++) {
      const square = squares[i];
      const piece = new Pawn(square, pieceColor, pieceShade);
      pieces.push(piece);
    }
    // pieces.push(new Pawn(squares[0], pieceColor, pieceShade));
    // pieces.push(new Pawn(squares[7], pieceColor, pieceShade));

    pieceColor = Color.BLACK;
    pieceShade = Shade.DARK;

    for (let i = 48; i < 56; i++) {
      const square = squares[i];
      const piece = new Pawn(square, pieceColor, pieceShade);
      pieces.push(piece);
    }

    return pieces;
  }

  public resize(canvasWidth: number, canvasHeight: number) {
    this.chessBoard.resize(canvasWidth, canvasHeight);
    this.chessPieces.forEach(piece => {
      piece.resize();
    });
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    this.chessBoard.draw(ctx);
    this.chessPieces.forEach(piece => {
      piece.draw(ctx);
    });
  }

  public clickHandler(clickLocation: Vec2) {
    const squares: ChessBoardSquare[] = this.chessBoard.getSquares();
    let square: ChessBoardSquare = null;
    let piece: ChessPiece = null;
    for (const s of squares) {
      if (s.contains(clickLocation.x, clickLocation.y)) {
        square = s;
        break;
      }
    }
    if (square) {
      for (const p of this.chessPieces) {
        if (p.getBoardSquare().equals(square)) {
          piece = p;
          break;
        }
      }
    }
    this.players.forEach(player => { player.clickHandler(this, square, piece); });
  }

  // returns a board square a certain number of hops away from the piece given
  public getSquare(piece: ChessPiece, direction: BoardDirection, numberOfHops: number): ChessBoardSquare {
    const getSquareIndex = (x: number, y: number) => {
      return x + (y * 8) ;
    };
    const square = piece.getBoardSquare();
    let boardX = square.getBoardX();
    let boardY = square.getBoardY();
    let multiplier = 0;

    const squares = this.chessBoard.getSquares();

    if (piece.getShade() === Shade.DARK) {
      multiplier = 1;
    } else {
      multiplier = -1;
    }
    switch (direction) {
      case BoardDirection.FORWARD:
        boardY += (-1 * multiplier) * numberOfHops;
        break;
      case BoardDirection.BACKWARD:
        boardY += (multiplier) * numberOfHops;
        break;
      case BoardDirection.LEFT:
        boardX += (-1 * multiplier) * numberOfHops;
        break;
      case BoardDirection.RIGHT:
        boardX += multiplier * numberOfHops;
        break;
      case BoardDirection.FORWARD_LEFT:
        boardX += (-1 * multiplier) * numberOfHops;
        boardY += (-1 * multiplier) * numberOfHops;
        break;
      case BoardDirection.FORWARD_RIGHT:
        boardX += (multiplier) * numberOfHops;
        boardY += (-1 * multiplier) * numberOfHops;
        break;
      case BoardDirection.BACKWARD_LEFT:
        boardX += (-1 * multiplier) * numberOfHops;
        boardY += (multiplier) * numberOfHops;
        break;
      case BoardDirection.BACKWARD_RIGHT:
        boardX += (multiplier) * numberOfHops;
        boardY += (multiplier) * numberOfHops;
        break;
    }

    if (boardX < 0 || boardX > 7 || boardY < 0 || boardY > 7) {
      return null;
    }

    const index = getSquareIndex(boardX, boardY);
    if (index < 0 || index > squares.length) {
      return null;
    } else {
      return squares[index];
    }
  }

  public getPieceOnSquare(square: ChessBoardSquare): ChessPiece {
    if (!square) {
      return null;
    }
    for (const piece of this.chessPieces) {
      if (piece.getBoardSquare().equals(square)) {
        return piece;
      }
    }
    return null;
  }

  public movePieceToSquare(piece: ChessPiece, square: ChessBoardSquare) {
    piece.moveToSquare(square).subscribe(() => {
      this.nextTurn();
    });
  }

  public removePieceFromBoard(piece: ChessPiece) {
    this.chessPieces = this.chessPieces.filter(p => {
      return !piece.equals(p);
    });
    piece.removeFromBoard();
  }

  public nextTurn(): void {
    this.darkTurn = !this.darkTurn;

    if (this.darkTurn) {
      this.darkPlayer.yourTurn();
    } else {
      this.lightPlayer.yourTurn();
    }
  }
}
