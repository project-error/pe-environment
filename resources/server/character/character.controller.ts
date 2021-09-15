import { CharacterService } from './character.service';
import { ServerController } from '../decorators/Controller';
import { CharacterEvents } from '../../shared/events';
import { CharacterProps } from './character.interface';
import { EventListener, NetEvent } from '../decorators/Events';
import { Character } from './character.class';

@ServerController('Character')
@EventListener()
export class CharacterController {
  private readonly _characterService: CharacterService;

  constructor(characterService: CharacterService) {
    this._characterService = characterService;
  }

  async createCharacter(characterDto: any) {
    const _source = global.source;

    await this._characterService.handleCreateCharacter(_source, characterDto);
  }

  @NetEvent(CharacterEvents.GET_CHARACTERS)
  async getCharacters() {
    const _source = global.source;

    const characters = await this._characterService.handleGetCharacters(_source);

    emitNet(CharacterEvents.SEND_CHARACTERS, _source, characters);
  }

  @NetEvent(CharacterEvents.SELECT_CHARACTER)
  async selectCharacter(character: CharacterProps) {
    console.log('select char', character);
    const _source = global.source;

    await this._characterService.handleGetSelectedCharacter(_source, character);
  }
}
