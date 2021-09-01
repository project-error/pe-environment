import { Container, Service } from 'typedi';
import { _CharacterDB } from './character.db';
import PlayerService from '../player/player.service';

@Service()
class _CharacterService {
  private readonly database: _CharacterDB;

  constructor(db: _CharacterDB) {
    this.database = db;
  }

  async handleCreateCharacter(src: number, characterDto: any) {
    const player = PlayerService.getPlayer(src);

    await this.database.createCharacter(player.getIdentifier(), characterDto);
  }
}

const instance = Container.get(_CharacterService);
export { instance as CharacterService };
