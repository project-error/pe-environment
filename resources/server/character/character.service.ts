import { Container, Service } from 'typedi';
import { CharacterDB } from './character.db';
import { PlayerService } from '../player/player.service';
import { injectable, singleton } from 'tsyringe';

@singleton()
export class CharacterService {
  private readonly database: CharacterDB;
  private readonly _playerService: PlayerService;

  constructor(playerService: PlayerService, db: CharacterDB) {
    this.database = db;
    this._playerService = playerService;
  }

  async handleCreateCharacter(src: number, characterDto: any) {
    const player = this._playerService.getPlayer(src);

    await this.database.createCharacter(player.getIdentifier(), characterDto);
  }
}
