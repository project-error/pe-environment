import { PlayerService } from './player.service';
import { ServerController } from '../decorators/Controller';
import { Event, EventListener } from '../decorators/Events';

@ServerController('Player')
@EventListener()
export class PlayerController {
  private readonly _playerService: PlayerService;

  constructor(playerService: PlayerService) {
    this._playerService = playerService;
  }

  @Event('playerJoining')
  public async playerJoining() {
    const _source = global.source;

    await this._playerService.handleNewPlayer(_source);
  }

  @Event('playerDropped')
  public async playerDropped() {
    const _source = global.source;

    this._playerService.removePlayer(_source);
  }
}
