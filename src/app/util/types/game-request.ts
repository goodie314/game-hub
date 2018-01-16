export interface GameRequest {
  gameRequestId: number;
  game: string;
  requester: String;
  invitees: String[];
  creationDate: Date;
}
