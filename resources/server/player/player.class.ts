import { PlayerProps } from './player.interface';

class Player {
  private readonly username: string;
  private readonly identifier: string | null;
  private readonly source: number;

  constructor({ username, source, identifier }: PlayerProps) {
    this.username = username;
    this.source = source;
    this.identifier = identifier;
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
}

export default Player;
