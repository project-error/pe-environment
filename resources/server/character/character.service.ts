import { CharacterDB } from './character.db';
import { PlayerService } from '../player/player.service';
import { singleton } from 'tsyringe';
import { CharacterProps } from './character.interface';

@singleton()
export class CharacterService {
  private readonly _db: CharacterDB;
  private readonly _playerService: PlayerService;

  constructor(playerService: PlayerService, db: CharacterDB) {
    this._db = db;
    this._playerService = playerService;
  }

  async handleCreateCharacter(src: number, characterDto: CharacterProps): Promise<void> {
    const player = this._playerService.getPlayer(src);

    await this._db.createCharacter(player.getPlayerId(), characterDto);
  }

  async handleGetSelectedCharacter(src: number, character: CharacterProps): Promise<CharacterProps> {
    const player = this._playerService.getPlayer(src);

    return this._db.getSelectedCharacter(player.getPlayerId(), character);
  }
}
