import { CharacterDB } from './character.db';
import { PlayerService } from '../player/player.service';
import { singleton } from 'tsyringe';
import { CharacterProps } from './character.interface';

@singleton()
export class CharacterService {
  private readonly database: CharacterDB;
  private readonly _playerService: PlayerService;

  constructor(playerService: PlayerService, db: CharacterDB) {
    this.database = db;
    this._playerService = playerService;
  }

  async handleCreateCharacter(src: number, characterDto: CharacterProps) {
    const player = this._playerService.getPlayer(src);

    await this.database.createCharacter(player.getPlayerId(), characterDto);
  }
}
