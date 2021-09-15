import { CharacterClassProps, CharacterProps } from './character.interface';

export class Character {
  private readonly _source: number;
  private readonly _characterId: number;
  private readonly _name: string;
  private readonly _phoneNumber: string;

  constructor({ source, characterId, name, phoneNumber }: CharacterClassProps) {
    this._source = source;
    this._characterId = characterId;
    this._name = name;
    this._phoneNumber = phoneNumber;
  }

  getCharacterId() {
    return this._characterId;
  }

  getName() {
    return this._name;
  }

  getPhoneNumber() {
    return this._phoneNumber;
  }
}
