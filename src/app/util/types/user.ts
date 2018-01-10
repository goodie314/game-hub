import {ActiveGame} from "./active-game";

export interface User {
  userName: string,
  firstName: string,
  lastName: string,
  activeGames: ActiveGame[]
}
