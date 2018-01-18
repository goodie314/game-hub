import {ChessPlayer} from "./chess-player";
import {Shade} from "../../enums/shade";
import {ChessMove} from "./chess-move";
import {ChessBoardSquare} from "../../../drawable/chess/board/chess-board-square";
import {ChessPiece} from "../../../drawable/chess/piece/chess-piece";
import {GamesService} from "../../services/games.service";
import {Game} from "../game";
import {ChessGameState} from "./chess-game-state";
import {Chess} from "./chess";
import {ChessMoveDto} from "./dto/chess-move-dto";
import {ChessPieceDto} from "./dto/chess-piece-dto";

export class OnlineChessPlayer extends ChessPlayer {
  private moves: ChessMove[] = [];
  private gameId: number;
  private userName: string;
  private local: boolean;
  private gamesService: GamesService;

  constructor(shade: Shade, gameId: number, userName: string, local: boolean, gamesService: GamesService) {
    super(shade);
    this.gameId = gameId;
    this.userName = userName;
    this.local = local;
    this.gamesService = gamesService;
  }

  public yourTurn(chess: Chess): void {
    super.yourTurn(chess);
    if (!this.local) {
      this.pollForUpdates();
    }
  }

  public takeTurn(move: ChessMove): void {
    // super.takeTurn(move);
    if (this.local) {
      const sourceSquare = move.movingPiece.getBoardSquare();
      move.movingPiece.setBoardSquare(move.destinationSquare);
      const pieces: ChessPieceDto[] = this.chess.getChessPiecesAsDto();
      move.movingPiece.setBoardSquare(sourceSquare);
      const gameState: ChessGameState = {
        chessPieces: pieces,
        lastMove: this.convertMoveToDto(move),
        lastPlayerToUpdate: this.userName
      };
      const game: Game = {
        gameId: this.gameId,
        currentGameState: JSON.stringify(gameState)
      };
      this.gamesService.updateGame(game).subscribe(() => {
        super.takeTurn(move);
      });
    } else {
      super.takeTurn(move);
    }
  }

  private pollForUpdates(): void {
    this.gamesService.getGame(this.gameId).subscribe(game => {
      if (game) {
        const gameState: ChessGameState = JSON.parse(game.currentGameState);
        if (gameState && gameState.lastPlayerToUpdate !== this.userName) {
          const sourceSquare = this.chess.getBoardSquareFromDto(gameState.lastMove.sourceLocation);
          const destination = this.chess.getBoardSquareFromDto(gameState.lastMove.destinationLocation);
          const sourcePiece = this.chess.getPieceOnSquare(sourceSquare);
          const destinationPiece = this.chess.getPieceOnSquare(destination);
          const move: ChessMove = {
            movingPiece: sourcePiece,
            destinationSquare: destination,
            capturedPiece: destinationPiece
          };
          this.takeTurn(move);
          return;
        }
      }
      window.setTimeout(() => {
        this.pollForUpdates();
      }, 500);
    });
  }

  public clickHandler(square: ChessBoardSquare, piece?: ChessPiece): void {
    if (!this.myTurn || !this.local) {
      return;
    }
    if (this.moves.length) {
      this.highlightMoves(false);
      for (const move of this.moves) {
        if (square.equals(move.destinationSquare)) {
          this.takeTurn(move);
          this.moves = [];
          return;
        }
      }
      this.moves = [];
    }

    if (piece && piece.getShade() === this.shade) {
      this.moves = this.potentialMoves.filter(move => {
        return piece.equals(move.movingPiece);
      });
      this.highlightMoves(true);
    }
  }

  private highlightMoves(highlight: boolean): void {
    this.moves.forEach(move => {
      move.destinationSquare.setHighlight(highlight);
    });
  }

  private convertMoveToDto(move: ChessMove): ChessMoveDto {
    return {
      sourceLocation: {
        boardX: move.movingPiece.getBoardSquare().getBoardX(),
        boardY: move.movingPiece.getBoardSquare().getBoardY()
      },
      destinationLocation: {
        boardX: move.destinationSquare.getBoardX(),
        boardY: move.destinationSquare.getBoardY()
      }
    };
  }
}
