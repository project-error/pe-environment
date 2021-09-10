import { CharacterService } from './character.service';
import { injectable, singleton } from 'tsyringe';

@singleton()
export class CharacterController {
  private readonly _characterService: CharacterService;

  constructor(characterService: CharacterService) {
    this._characterService = characterService;

    onNet('pe:characterSelected', async (characterDto: any) => await this.createCharacter(characterDto));
  }

  async createCharacter(characterDto: any) {
    const _source = global.source;

    await this._characterService.handleCreateCharacter(_source, characterDto);
  }
}
