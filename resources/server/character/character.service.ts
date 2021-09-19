import { CharacterDB } from './character.db';
import { PlayerService } from '../player/player.service';
import { singleton } from 'tsyringe';
import { CharacterProps } from './character.interface';
import { Character } from './character.class';

@singleton()
export class CharacterService {
  private readonly charactersBySource: Map<number, Character>;
  private readonly _db: CharacterDB;
  private readonly _playerService: PlayerService;

  constructor(playerService: PlayerService, db: CharacterDB) {
    this._db = db;
    this._playerService = playerService;
    this.charactersBySource = new Map<number, Character>();

    global.exports('GetCharacter', async (src: number) => {
      const player = this._playerService.getPlayer(src);
      const character = this.charactersBySource.get(src);

      return await this._db.getSelectedCharacter(player.getPlayerId(), character.getCharacterId());
    });
  }

  async handleCreateCharacter(src: number, characterDto: CharacterProps): Promise<void> {
    const player = this._playerService.getPlayer(src);

    await this._db.createCharacter(player.getPlayerId(), characterDto);
  }

  async handleGetCharacters(src: number) {
    const player = this._playerService.getPlayer(src);

    return await this._db.getCharacters(player.getPlayerId());
  }

  async handleGetSelectedCharacter(src: number, character: CharacterProps): Promise<void> {
    const player = this._playerService.getPlayer(src);

    const selectedCharacter = await this._db.getSelectedCharacter(player.getPlayerId(), character.characterId);

    const newCharacter = new Character({
      source: src,
      name: selectedCharacter.name,
      characterId: selectedCharacter.characterId,
      phoneNumber: selectedCharacter.phoneNumber,
    });

    console.log('New character');
    console.log(newCharacter);

    this.charactersBySource.set(src, newCharacter);

    emit('npwd:newPlayer', {
      source: src,
      identifier: selectedCharacter.characterId,
      firstname: selectedCharacter.name,
    });
  }
}
