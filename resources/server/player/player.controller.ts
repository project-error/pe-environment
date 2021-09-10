import { PlayerService } from './player.service';
import { injectable, singleton } from 'tsyringe';

@singleton()
export class PlayerController {
  private readonly _playerService: PlayerService;

  constructor(playerService: PlayerService) {
    this._playerService = playerService;

    on('playerJoining', async () => await this.playerJoining());
    on('playerDropped', async () => await this.playerDropped());
  }

  public async playerJoining() {
    const _source = global.source;

    await this._playerService.handleNewPlayer(_source);
  }

  public async playerDropped() {
    const _source = global.source;

    this._playerService.removePlayer(_source);
  }
}
