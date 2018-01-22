import {ChessPlayer} from "./chess-player";
import {Vec2} from "../vec2";
import {ChessBoard} from "../../../drawable/chess/board/chess-board";
import {ChessPiece} from "../../../drawable/chess/piece/chess-piece";
import {Color} from "../../enums/color";
import {Pawn} from "../../../drawable/chess/piece/pawn";
import {Shade} from "../../enums/shade";
import {BoardDirection} from "../../enums/board-direction";
import {ChessBoardSquare} from "../../../drawable/chess/board/chess-board-square";
import {Rook} from "../../../drawable/chess/piece/rook";
import {Knight} from "../../../drawable/chess/piece/knight";
import {Bishop} from "../../../drawable/chess/piece/bishop";
import {Queen} from "../../../drawable/chess/piece/queen";
import {King} from "../../../drawable/chess/piece/king";
import {EventEmitter} from "@angular/core";
import {ChessMove} from "./chess-move";
import {ChessLocationDto} from "./dto/chess-location-dto";
import {ChessPieceDto} from "./dto/chess-piece-dto";
import {ChessGameState} from "./chess-game-state";
import {ChessPieceEnum} from "../../enums/chess-pieces-enum";
export class Chess {

  private chessBoard: ChessBoard;
  private chessPieces: ChessPiece[];

  private players: ChessPlayer[];
  private darkTurn = true;
  private darkPlayer: ChessPlayer;
  private lightPlayer: ChessPlayer;

  private gameOverHook: EventEmitter<string> = new EventEmitter();

  constructor(canvasWidth: number, canvasHeight: number, players: ChessPlayer[], saveState?: ChessGameState, darkTurn = true) {
    this.players = players;
    this.chessBoard = new ChessBoard(canvasWidth, canvasHeight);
    if (saveState && saveState.chessPieces) {
      this.loadBoardState(saveState.chessPieces);
    } else {
      this.chessPieces = this.setupPieces();
    }
    this.darkPlayer = players[0];
    this.lightPlayer = players[1];
    if (darkTurn) {
      this.darkPlayer.yourTurn(this);
      this.darkTurn = true;
    } else {
      this.lightPlayer.yourTurn(this);
      this.darkTurn = darkTurn;
    }
  }

  // set pieces in their starting positions
  private setupPieces(): ChessPiece[] {
    const pieces: ChessPiece[] = [];
    const squares = this.chessBoard.getSquares();
    // Set light colored pieces
    let pieceColor = Color.WHITE;
    let pieceShade = Shade.LIGHT;

    for (let i = 8; i < 16; i++) {
      const square = squares[i];
      const piece = new Pawn(square, pieceColor, pieceShade);
      pieces.push(piece);
    }
    pieces.push(new Rook(squares[0], pieceColor, pieceShade));
    pieces.push(new Knight(squares[1], pieceColor, pieceShade));
    pieces.push(new Bishop(squares[2], pieceColor, pieceShade));
    pieces.push(new Queen(squares[3], pieceColor, pieceShade));
    pieces.push(new King(squares[4], pieceColor, pieceShade));
    pieces.push(new Bishop(squares[5], pieceColor, pieceShade));
    pieces.push(new Knight(squares[6], pieceColor, pieceShade));
    pieces.push(new Rook(squares[7], pieceColor, pieceShade));

    // Set dark colored pieces
    pieceColor = Color.BLACK;
    pieceShade = Shade.DARK;

    for (let i = 48; i < 56; i++) {
      const square = squares[i];
      const piece = new Pawn(square, pieceColor, pieceShade);
      pieces.push(piece);
    }
    pieces.push(new Rook(squares[56], pieceColor, pieceShade));
    pieces.push(new Knight(squares[57], pieceColor, pieceShade));
    pieces.push(new Bishop(squares[58], pieceColor, pieceShade));
    pieces.push(new Queen(squares[59], pieceColor, pieceShade));
    pieces.push(new King(squares[60], pieceColor, pieceShade));
    pieces.push(new Bishop(squares[61], pieceColor, pieceShade));
    pieces.push(new Knight(squares[62], pieceColor, pieceShade));
    pieces.push(new Rook(squares[63], pieceColor, pieceShade));

    return pieces;
  }

  // loads board from saved state
  private loadBoardState(pieces: ChessPieceDto[]): void {
    const getBoardIndex = (x, y) => {
      return x + (y * 8);
    };
    const squares = this.chessBoard.getSquares();
    this.chessPieces = pieces.map(piece => {
      const square = squares[getBoardIndex(piece.location.boardX, piece.location.boardY)];
      return this.getPieceFromDto(square, piece);
    });
  }

  private getPieceFromDto(square: ChessBoardSquare, chessPieceDto: ChessPieceDto): ChessPiece {
    let piece: ChessPiece;
    switch (chessPieceDto.type) {
      case ChessPieceEnum.BISHOP:
        piece = new Bishop(square, chessPieceDto.color, chessPieceDto.shade);
        break;
      case ChessPieceEnum.PAWN:
        piece = new Pawn(square, chessPieceDto.color, chessPieceDto.shade);
        break;
      case ChessPieceEnum.ROOK:
        piece = new Rook(square, chessPieceDto.color, chessPieceDto.shade);
        break;
      case ChessPieceEnum.KNIGHT:
        piece = new Knight(square, chessPieceDto.color, chessPieceDto.shade);
        break;
      case ChessPieceEnum.QUEEN:
        piece = new Queen(square, chessPieceDto.color, chessPieceDto.shade);
        break;
      case ChessPieceEnum.KING:
        piece = new King(square, chessPieceDto.color, chessPieceDto.shade);
        break;
    }
    return piece;
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
    if (square) {
      this.players.forEach(player => { player.clickHandler(square, piece); });
    }
  }

  public dragHandler (mouseLocation: Vec2) {
    this.players.forEach(player => {
      player.dragHandler(mouseLocation);
    });
  }

  // returns a board square a certain number of hops away from the piece given
  public getSquare(piece: ChessPiece, direction: BoardDirection, numberOfHops: number, fromSquare?: ChessBoardSquare): ChessBoardSquare {
    const getSquareIndex = (x: number, y: number) => {
      return x + (y * 8) ;
    };
    if (!fromSquare) {
      fromSquare = piece.getBoardSquare();
    }
    // const square = piece.getBoardSquare();
    let boardX = fromSquare.getBoardX();
    let boardY = fromSquare.getBoardY();
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

  public getBoardSquareFromDto(location: ChessLocationDto): ChessBoardSquare {
    for (const square of this.chessBoard.getSquares()) {
      if (square.getBoardX() === location.boardX && square.getBoardY() === location.boardY) {
        return square;
      }
    }

    return null;
  }

  public isMoveLegal(move: ChessMove): boolean {
    const sourceSquare = move.movingPiece.getBoardSquare();
    move.movingPiece.setBoardSquare(move.destinationSquare);

    const opponentPieces = this.chessPieces.filter(piece => {
      if (move.capturedPiece && piece.equals(move.capturedPiece)) {
        return false;
      }
      return piece.getShade() !== move.movingPiece.getShade();
    });

    for (const piece of opponentPieces) {
      const moves = piece.getPotentialMoves(this);
      for (const m of moves) {
        if (m.capturedPiece) {
          if (m.capturedPiece.getValue() === 99 && m.capturedPiece.getShade() === move.movingPiece.getShade()) {
            move.movingPiece.setBoardSquare(sourceSquare);
            return false;
          }
        }
      }
    }
    move.movingPiece.setBoardSquare(sourceSquare);
    return true;
  }

  public removePieceFromBoard(piece: ChessPiece): void {
    this.chessPieces = this.chessPieces.filter(p => {
      return !piece.equals(p);
    });
    piece.removeFromBoard();
    if (piece.getValue() === 99) {
      if (this.darkTurn) {
        this.gameOver('Dark Wins');
      } else {
        this.gameOver('Light Wins');
      }
    }
  }

  public nextTurn(): void {
    this.darkTurn = !this.darkTurn;

    if (this.darkTurn) {
      this.darkPlayer.yourTurn(this);
    } else {
      this.lightPlayer.yourTurn(this);
    }
  }

  public getChessPieces(): ChessPiece[] {
    return this.chessPieces;
  }

  public getChessPiecesAsDto(): ChessPieceDto[] {
    const pieces: ChessPieceDto[] = [];
    this.chessPieces.forEach(piece => {
      pieces.push({
        location: {
          boardX: piece.getBoardSquare().getBoardX(),
          boardY: piece.getBoardSquare().getBoardY()
        },
        color: piece.getColor(),
        shade: piece.getShade(),
        type: piece.getType()
      });
    });
    return pieces;
  }

  public getGameOverHook(): EventEmitter<string> {
    return this.gameOverHook;
  }

  public gameOver(message: string) {
    this.gameOverHook.emit(message);
  }
}
