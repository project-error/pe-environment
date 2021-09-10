import Player from './player.class';
import { getPlayerGameLicense } from '../utils/getPlayerGameLicense';
import { PlayerDB } from './player.db';
import { injectable, singleton } from 'tsyringe';

@singleton()
export class PlayerService {
  private readonly playersBySource: Map<number, Player>;
  private readonly _db: PlayerDB;

  constructor(db: PlayerDB) {
    this.playersBySource = new Map<number, Player>();
    this._db = db;
  }

  addPlayerToMap(source: number, player: Player) {
    this.playersBySource.set(source, player);
  }

  removePlayer(source: number) {
    this.playersBySource.delete(source);
  }

  getPlayer(source: number) {
    return this.playersBySource.get(source);
  }

  async handleNewPlayer(source: number) {
    try {
      const username = GetPlayerName(source.toString());
      const identifier = getPlayerGameLicense(source);
      let playerId: number;

      const doesPlayerExist = await this._db.getPlayer(identifier);
      if (doesPlayerExist) playerId = doesPlayerExist.id;

      if (!doesPlayerExist) {
        playerId = await this._db.createPlayer(identifier, username);
        console.log('player does exist');
      }

      const newPlayer = new Player({ source, username, identifier, playerId });

      this.addPlayerToMap(source, newPlayer);

      console.log('New player loaded:');
      console.log(newPlayer);
    } catch (err) {
      console.log(err.message);
    }
  }
}
