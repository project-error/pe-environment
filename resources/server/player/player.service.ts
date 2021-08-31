import Player from './player.class';
import { getPlayerGameLicense } from '../utils/getPlayerGameLicense';

class _PlayerService {
  private readonly playersBySource: Map<number, Player>;

  constructor() {
    this.playersBySource = new Map<number, Player>();
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

  handleNewPlayer(source: number) {
    const username = GetPlayerName(source.toString());
    const identifier = getPlayerGameLicense(source);

    const newPlayer = new Player({ source, identifier: identifier, username });

    this.addPlayerToMap(source, newPlayer);
  }
}

const PlayerService = new _PlayerService();
export default PlayerService;
