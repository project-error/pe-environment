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
  }

  async handleCreateCharacter(src: number, characterDto: CharacterProps): Promise<void> {
    const player = this._playerService.getPlayer(src);

    await this._db.createCharacter(player.getPlayerId(), characterDto);
  }

  async handleGetCharacters(src: number) {
    const player = this._playerService.getPlayer(src);

    const characters = await this._db.getCharacters(player.getPlayerId());
    return characters;
  }

  async handleGetSelectedCharacter(src: number, character: CharacterProps): Promise<void> {
    const player = this._playerService.getPlayer(src);

    const selectedCharacter = await this._db.getSelectedCharacter(player.getPlayerId(), character);

    const newCharacter = new Character({
      name: selectedCharacter.name,
      characterId: selectedCharacter.characterId,
      source: src,
      phoneNumber: null,
    });

    console.log('New character');
    console.log(newCharacter);

    this.charactersBySource.set(src, newCharacter);
  }
}
