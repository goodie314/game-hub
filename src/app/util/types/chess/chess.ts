import {ChessPlayer} from "./chess-player";
import {Vec2} from "../vec2";
import {ChessBoard} from "../../../drawable/chess/board/chess-board";
import {ChessPiece} from "../../../drawable/chess/piece/chess-piece";
import {Color} from "../../enums/color";
import {Pawn} from "../../../drawable/chess/piece/pawn";
import {Shade} from "../../enums/shade";
import {BoardDirection} from "../../enums/board-direction";
import {BoardSquare} from "../../../drawable/checkers/board-square";
export class Chess {

  private chessBoard: ChessBoard;
  private chessPieces: ChessPiece[];
  private players: ChessPlayer[];

  constructor(canvasWidth: number, canvasHeight: number, players: ChessPlayer[]) {
    this.players = players;
    this.chessBoard = new ChessBoard(canvasWidth, canvasHeight);
    this.chessPieces = this.setupPieces();
  }

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
    })
  }

  public clickHandler(clickLocation: Vec2) {
    this.players.forEach(player => { player.clickHandler(clickLocation); });
  }

  public getSquare(piece: ChessPiece, direction: BoardDirection): BoardSquare {
    const squares = this.chessBoard.getSquares();
    let moveIndex = 0;
    switch(direction) {
      case BoardDirection.FORWARD:
        moveIndex = -8;
        break;
      case BoardDirection.BACKWARD:
        moveIndex = 8;
        break;
      case BoardDirection.LEFT:
        moveIndex = -1;
        break;
    }
    return null;
  }

  public movePieceToSquare(piece, square) {
  }

  public removePieceFromBoard(piece) {
  }

  public getPotentialMovesForPiece(piece): any[] {
    return [];
  }
}
