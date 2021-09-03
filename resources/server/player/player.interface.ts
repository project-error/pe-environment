export type PlayerProps = {
  username: string;
  source: number;
  identifier: string | null;
  playerId: number;
};

export type PlayerDBProps = {
  id: number;
  identifier: string;
  username: string;
};

export interface PlayerDatabaseProps {
  createPlayer(identifier: string, username: string): Promise<number>;

  getPlayer(identifier: string): Promise<any>;
}
