import { Artist } from "./artist.model";
import { User } from "./user.model";

export class Session {
    public token: string;
    public user: User;
    public artist: Artist;
  }