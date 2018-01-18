import {ChessLocationDto} from "./chess-location-dto";

export interface ChessMoveDto {
  sourceLocation: ChessLocationDto;
  destinationLocation: ChessLocationDto;
}
