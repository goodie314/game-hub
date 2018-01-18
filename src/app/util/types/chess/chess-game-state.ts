import {ChessMoveDto} from "./dto/chess-move-dto";
import {ChessPieceDto} from "./dto/chess-piece-dto";

export interface ChessGameState {
  chessPieces: ChessPieceDto[];
  lastMove: ChessMoveDto;
  lastPlayerToUpdate: string;
}
