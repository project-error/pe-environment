import Player from './player.class';
import { getPlayerGameLicense } from '../utils/getPlayerGameLicense';
import { _PlayerDB } from './player.db';
import { Container, Service } from 'typedi';

@Service()
class _PlayerService {
  private readonly playersBySource: Map<number, Player>;
  private readonly playerDB: _PlayerDB;

  constructor(db: _PlayerDB) {
    this.playersBySource = new Map<number, Player>();
    this.playerDB = db;
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

      const doesPlayerExist = await this.playerDB.getPlayer(identifier);
      if (doesPlayerExist) playerId = doesPlayerExist.id;

      if (!doesPlayerExist) {
        playerId = await this.playerDB.createPlayer(identifier, username);
        console.log('player does exist');
      }

      const newPlayer = new Player({ source, username, identifier, playerId });

      this.addPlayerToMap(source, newPlayer);

      console.log(newPlayer);
    } catch (err) {
      console.log(err.message);
    }
  }
}

const PlayerService = Container.get(_PlayerService);
export default PlayerService;
