import {User} from "./user";

export interface GameRequest {
  game: string;
  requester: User;
  invitees: {[userName: string]: boolean};
}
