export interface Game {
  gameId: number;
  currentGameState: string;
  players?: string[];
  gameDescriptor?: string;
}
