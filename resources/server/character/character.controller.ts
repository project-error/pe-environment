import { CharacterService } from './character.service';
import { ServerController } from '../decorators/Controller';
import { CharacterEvents } from '../../shared/events';
import { CharacterProps } from './character.interface';

@ServerController('Character')
export class CharacterController {
  private readonly _characterService: CharacterService;
  private readonly characterByPlayerId: Map<number, CharacterProps>;

  constructor(characterService: CharacterService) {
    this._characterService = characterService;
    this.characterByPlayerId = new Map<number, CharacterProps>();

    onNet('pe:characterSelected', async (characterDto: any) => await this.createCharacter(characterDto));
    onNet(CharacterEvents.SELECT_CHARACTER, async (character: CharacterProps) => await this.selectCharacter(character));
  }

  async createCharacter(characterDto: any) {
    const _source = global.source;

    await this._characterService.handleCreateCharacter(_source, characterDto);
  }

  async selectCharacter(character: CharacterProps) {
    const _source = global.source;

    const selectedCharacter = await this._characterService.handleGetSelectedCharacter(_source, character);

    this.characterByPlayerId.set(_source, selectedCharacter);
  }
}
