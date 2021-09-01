import { PlayerProps } from './player.interface';

class Player {
  private readonly username: string;
  private readonly identifier: string | null;
  private readonly source: number;
  private readonly playerId: number;

  constructor({ username, source, identifier, playerId }: PlayerProps) {
    this.username = username;
    this.source = source;
    this.identifier = identifier;
    this.playerId = playerId;
  }

  getUsername(): string {
    return this.username;
  }

  getIdentifier(): string | null {
    return this.identifier;
  }

  getSource(): number {
    return this.source;
  }

  getPlayerId(): number {
    return this.playerId;
  }
}

export default Player;
